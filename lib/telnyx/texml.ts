import {
  FAILOVER_COPY,
  GATHER_PARAMETERS,
  SPOKEN_GREETING_COPY,
  SUCCESS_COPY,
} from "@/lib/telnyx/script";

export const ATTENDANT_VOICE = "Telnyx.KokoroTTS.af_heart";

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
    `  <Say voice="${ATTENDANT_VOICE}">${escapeXml(SUCCESS_COPY)}</Say>\n  <Hangup/>`,
  );
}

export function failoverRecordTexml(recordActionUrl: string) {
  const action = escapeXml(recordActionUrl);
  // Record action is the only lead-delivery callback. Do not also set
  // recordingStatusCallback to this URL — Telnyx would POST twice.
  return texmlDocument(
    [
      `  <Say voice="${ATTENDANT_VOICE}">${escapeXml(FAILOVER_COPY)}</Say>`,
      `  <Record action="${action}" method="POST" maxLength="90" timeout="5" playBeep="true"/>`,
      "  <Hangup/>",
    ].join("\n"),
  );
}

export function inboundGatherTexml(gatherActionUrl: string) {
  const parameters = JSON.stringify(GATHER_PARAMETERS, null, 2);
  // TeXML AIGather accepts action and method only. userResponseTimeoutMs is
  // Voice API. Assistant is not a documented TeXML noun and needs a BYO key.
  return texmlDocument(
    [
      `  <AIGather action="${escapeXml(gatherActionUrl)}" method="POST">`,
      `    <Greeting>${escapeXml(SPOKEN_GREETING_COPY)}</Greeting>`,
      `    <Voice name="${ATTENDANT_VOICE}"/>`,
      "    <Parameters>",
      "      <![CDATA[",
      parameters,
      "      ]]>",
      "    </Parameters>",
      "  </AIGather>",
    ].join("\n"),
  );
}
