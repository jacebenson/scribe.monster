import mjml2html from 'mjml'
export const render = ({ name, resetLink }) => {
  return mjml2html(mjml(name, resetLink), {})
}
let mjml = (name, resetLink, brand) => {
  return `<mjml>
  <mj-body>
    <mj-raw>
      <!-- Company Header -->
    </mj-raw>
    <mj-section background-color="#f0f0f0">
      <mj-column>
        <mj-text font-style="italic" font-size="20px" color="#626262">${brand}</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Image Header -->
    </mj-raw>
    <mj-section background-color="#2f855a" background-size="cover" background-repeat="no-repeat">
      <mj-column width="600px">
        <mj-text align="center" color="#fff" font-size="20px" font-family="Open Sans">
          ${name}, trouble signing in?
        </mj-text>
        <mj-button background-color="#fff" color="#2f855a" href="${resetLink}">Reset your password</mj-button>
      </mj-column>
    </mj-section>
    <mj-raw>
    <!-- Intro text -->
  </mj-raw>
  <mj-section background-color="#fafafa">
    <mj-column width="400px">
      <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue">If you did not forget your password, ignore this email.</mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>`
}
