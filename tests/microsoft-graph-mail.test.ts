import assert from "node:assert/strict";
import test from "node:test";
import {
  GraphMailError,
  sendGraphMail,
  type GraphFetch,
} from "@/lib/microsoft-graph-mail";

const message = {
  to: "contact@stlouiscreations.com",
  replyTo: "visitor@example.com",
  subject: "St. Louis Creations quote request: Laser Cutting",
  html: "<p>Escaped quote</p>",
};

const config = {
  tenantId: "tenant/id",
  clientId: "client-id",
  clientSecret: "client-secret",
  fromEmail: "Media@digitalenergymedia.com",
};

test("rejects incomplete Graph configuration before making a request", async () => {
  let calls = 0;
  const fetcher: GraphFetch = async () => {
    calls += 1;
    return new Response(null, { status: 500 });
  };

  await assert.rejects(
    sendGraphMail(message, { ...config, clientSecret: "" }, fetcher),
    (error: unknown) =>
      error instanceof GraphMailError && error.stage === "configuration",
  );
  assert.equal(calls, 0);
});

test("requests an app token and sends the fixed Graph mail payload", async () => {
  const calls: Array<{ input: string; init?: RequestInit }> = [];
  const fetcher: GraphFetch = async (input, init) => {
    calls.push({ input, init });
    if (calls.length === 1) {
      return Response.json({ access_token: "test-access-token" });
    }
    return new Response(null, { status: 202 });
  };

  await sendGraphMail(message, config, fetcher);

  assert.equal(
    calls[0]?.input,
    "https://login.microsoftonline.com/tenant%2Fid/oauth2/v2.0/token",
  );
  const tokenBody = new URLSearchParams(String(calls[0]?.init?.body));
  assert.equal(tokenBody.get("client_id"), "client-id");
  assert.equal(tokenBody.get("client_secret"), "client-secret");
  assert.equal(tokenBody.get("grant_type"), "client_credentials");
  assert.equal(tokenBody.get("scope"), "https://graph.microsoft.com/.default");

  assert.equal(
    calls[1]?.input,
    "https://graph.microsoft.com/v1.0/users/Media%40digitalenergymedia.com/sendMail",
  );
  assert.equal(
    (calls[1]?.init?.headers as Record<string, string>).Authorization,
    "Bearer test-access-token",
  );
  assert.deepEqual(JSON.parse(String(calls[1]?.init?.body)), {
    message: {
      subject: message.subject,
      body: { contentType: "HTML", content: message.html },
      replyTo: [{ emailAddress: { address: "visitor@example.com" } }],
      toRecipients: [
        { emailAddress: { address: "contact@stlouiscreations.com" } },
      ],
    },
    saveToSentItems: true,
  });
});

test("rejects missing tokens and non-202 Graph responses without raw details", async () => {
  const rejectedTokenFetcher: GraphFetch = async () =>
    Response.json(
      {
        error: "invalid_client",
        error_description: "private credential details must not appear",
      },
      { status: 401 },
    );
  await assert.rejects(
    sendGraphMail(message, config, rejectedTokenFetcher),
    (error: unknown) => {
      assert.ok(error instanceof GraphMailError);
      assert.equal(error.stage, "token");
      assert.equal(error.status, 401);
      assert.equal(error.code, "invalid_client");
      assert.doesNotMatch(error.message, /private credential details/);
      return true;
    },
  );

  const missingTokenFetcher: GraphFetch = async () => Response.json({});
  await assert.rejects(
    sendGraphMail(message, config, missingTokenFetcher),
    (error: unknown) =>
      error instanceof GraphMailError &&
      error.stage === "token" &&
      error.code === "missing_access_token",
  );

  let call = 0;
  const rejectedSendFetcher: GraphFetch = async () => {
    call += 1;
    if (call === 1) {
      return Response.json({ access_token: "test-access-token" });
    }
    return Response.json(
      {
        error: {
          code: "ErrorAccessDenied",
          message: "private mailbox details must not appear",
        },
      },
      { status: 403 },
    );
  };

  await assert.rejects(
    sendGraphMail(message, config, rejectedSendFetcher),
    (error: unknown) => {
      assert.ok(error instanceof GraphMailError);
      assert.equal(error.stage, "send");
      assert.equal(error.status, 403);
      assert.equal(error.code, "ErrorAccessDenied");
      assert.doesNotMatch(error.message, /private mailbox details/);
      return true;
    },
  );
});

test("does not accept a Graph 200 response as sendMail success", async () => {
  let call = 0;
  const fetcher: GraphFetch = async () => {
    call += 1;
    return call === 1
      ? Response.json({ access_token: "test-access-token" })
      : Response.json({ id: "unexpected" }, { status: 200 });
  };

  await assert.rejects(
    sendGraphMail(message, config, fetcher),
    (error: unknown) => error instanceof GraphMailError && error.stage === "send",
  );
});

test("normalizes token timeouts and send aborts with their provider stage", async () => {
  let tokenSignal: AbortSignal | null | undefined;
  const tokenTimeoutFetcher: GraphFetch = async (_input, init) => {
    tokenSignal = init?.signal;
    return waitForSignalAbort(init?.signal);
  };

  await assert.rejects(
    sendGraphMail(
      message,
      config,
      tokenTimeoutFetcher,
      () => AbortSignal.timeout(1),
    ),
    (error: unknown) => {
      assert.ok(error instanceof GraphMailError);
      assert.equal(error.stage, "token");
      assert.equal(error.code, "request_failed");
      assert.doesNotMatch(error.message, /request signal did not abort/);
      return true;
    },
  );
  assert.ok(tokenSignal?.aborted);

  let call = 0;
  let sendSignal: AbortSignal | null | undefined;
  const sendAbortFetcher: GraphFetch = async (_input, init) => {
    call += 1;
    if (call === 1) {
      return Response.json({ access_token: "test-access-token" });
    }
    sendSignal = init?.signal;
    return waitForSignalAbort(init?.signal);
  };

  await assert.rejects(
    sendGraphMail(
      message,
      config,
      sendAbortFetcher,
      () => AbortSignal.timeout(1),
    ),
    (error: unknown) => {
      assert.ok(error instanceof GraphMailError);
      assert.equal(error.stage, "send");
      assert.equal(error.code, "request_failed");
      assert.doesNotMatch(error.message, /request signal did not abort/);
      return true;
    },
  );
  assert.ok(sendSignal?.aborted);
});

function waitForSignalAbort(signal: AbortSignal | null | undefined) {
  return new Promise<never>((_resolve, reject) => {
    if (!signal) {
      reject(new Error("missing request signal"));
      return;
    }

    const timeout = setTimeout(
      () => reject(new Error("request signal did not abort")),
      20,
    );
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

test("normalizes malformed and invalid token payloads", async () => {
  const malformedTokenFetcher: GraphFetch = async () =>
    new Response("{not valid JSON", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  await assert.rejects(
    sendGraphMail(message, config, malformedTokenFetcher),
    (error: unknown) =>
      error instanceof GraphMailError &&
      error.stage === "token" &&
      error.code === "invalid_token_response",
  );

  const invalidTokenFetcher: GraphFetch = async () => Response.json(null);
  await assert.rejects(
    sendGraphMail(message, config, invalidTokenFetcher),
    (error: unknown) =>
      error instanceof GraphMailError &&
      error.stage === "token" &&
      error.code === "invalid_token_response",
  );
});
