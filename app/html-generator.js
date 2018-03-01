const generate = endpoint => {
  return `<html>
  <head>
    <title>Pusher Auth Server Example</title>
  </head>
  <body>
    <h1>Pusher Auth Server Example</h1>
    <p>
      Your Pusher example auth server is up.
      Your <code>authEndpoint</code> is:
    </p>
      <pre>
<span id="host"></span>${endpoint}
      </pre>
    <p>Try sending an example <code>POST</code> request  using <code>curl</code>
    <pre>
curl -X POST <span id="host"></span>${endpoint} \\
  -H "Content-Type: application/json" \\
  -d '{"socket_id": "100.100", "channel_name": "private-document"}'
    </pre>
  </body>
  <script>
    document
      .querySelectorAll('#host')
      .forEach(node => {node.innerText = window.location.origin})
  </script>
</html>`;
};

exports.generate = generate;
