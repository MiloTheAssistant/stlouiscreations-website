import {
  ASSISTANT_INSTRUCTIONS,
  FAILOVER_COPY,
  GATHER_PARAMETERS,
  GREETING_COPY,
  SUCCESS_COPY,
} from "@/lib/telnyx/script";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function texmlDocument(inner: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n${inner}\n</Response>`;
}

export function texmlResponse(xml: string) {
  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
  });
}

export function hangupTexml() {
  return texmlDocument("  <Hangup/>");
}

export function successTexml() {
  return texmlDocument(
    `  <Say voice="Polly.Joanna">${escapeXml(SUCCESS_COPY)}</Say>\n  <Hangup/>`,
  );
}

export function failoverRecordTexml(recordActionUrl: string) {
  const action = escapeXml(recordActionUrl);
  return texmlDocument(
    [
      `  <Say voice="Polly.Joanna">${escapeXml(FAILOVER_COPY)}</Say>`,
      `  <Record action="${action}" method="POST" maxLength="90" timeout="5" playBeep="true" recordingStatusCallback="${action}" recordingStatusCallbackMethod="POST" recordingStatusCallbackEvent="completed"/>`,
      "  <Hangup/>",
    ].join("\n"),
  );
}

export function inboundGatherTexml(gatherActionUrl: string) {
  const parameters = JSON.stringify(GATHER_PARAMETERS, null, 2);
  return texmlDocument(
    [
      `  <AIGather action="${escapeXml(gatherActionUrl)}" method="POST" userResponseTimeoutMs="20000">`,
      `    <Greeting>${escapeXml(GREETING_COPY)}</Greeting>`,
      `    <Voice name="Polly.Joanna"/>`,
      "    <Parameters>",
      "      <![CDATA[",
      parameters,
      "      ]]>",
      "    </Parameters>",
      `    <Assistant instructions="${escapeXml(ASSISTANT_INSTRUCTIONS)}"/>`,
      "  </AIGather>",
    ].join("\n"),
  );
}
