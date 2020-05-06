const keys = require("../../config/keys");

module.exports = ({ body, id }) =>
  `<html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input, sire!</h3>
        <p>Please answer the following to win $100:</p>
        <p>${body}</p>
        <div>
          <a href="${keys.emailURL}/surveys/${id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.emailURL}/surveys/${id}/no">No</a>
        </div>
      </div>
    </body>
  </html>`;
