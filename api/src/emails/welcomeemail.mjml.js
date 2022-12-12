import mjml2html from 'mjml'
export const render = ({
  name,
  brand,
  whatIsThis,
  login,
  welcomeImage,
  introVideo,
  cta1,
  cta2,
  cta3,
  cta4,
}) => {
  return mjml2html(
    mjml(
      name,
      brand,
      whatIsThis,
      login,
      welcomeImage,
      introVideo,
      cta1,
      cta2,
      cta3,
      cta4
    ),
    {}
  )
}
let mjml = (
  name,
  brand,
  whatIsThis,
  login,
  welcomeImage,
  introVideo,
  cta1,
  cta2,
  cta3,
  cta4
) => {
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
          ${name}, thanks for signing up
        </mj-text>
        <mj-button background-color="#fff" color="#2f855a" href="${login.url}">${login.text}</mj-button>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Intro text -->
    </mj-raw>
    <mj-section background-color="#fafafa">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">What is ${brand}?</mj-text>
        <mj-text color="#525252">${whatIsThis}</mj-text>

        <mj-button background-color="#2f855a" href="${introVideo.url}">${introVideo.text}</mj-button>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Side image -->
    </mj-raw>
    <mj-section background-color="white">
      <mj-raw>
        <!-- Left image -->
      </mj-raw>
      <mj-column>
        <mj-image width="200px" alt="${welcomeImage.text}" src="${welcomeImage.url}"></mj-image>
      </mj-column>
      <mj-raw>
        <!-- right paragraph -->
      </mj-raw>
      <mj-column>
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">About me</mj-text>
        <mj-text color="#525252">Whenever I see something I think is great, the first question I have is who is behind this.</mj-text>
        <mj-text color="#525252">Hi, I'm <a href="https://jace.pro">Jace</a>.  I've been adding value to folks in IT for over a decade.  I've been making stuff all over.  Most recently <a href="https://scribe.monster">ScribeMonster</a>, but before that <a href="https://news.jace.pro">News.jace.pro</a> which is based on <a href="https://tskr.io">Tskr.io</a>.</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Outro text -->
    </mj-raw>
    <mj-section background-color="#2f855a">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#fff">How can you help?</mj-text>
<mj-button background-color="#fff" href="${cta1.url}" color="#2f855a">${cta1.text}</mj-button>
        <mj-button background-color="#fff" href="${cta2.url}" color="#2f855a">${cta2.text}</mj-button>
        <mj-button background-color="#fff" href="${cta3.url}" color="#2f855a">${cta3.text}</mj-button>
        <mj-button background-color="#fff" href="${cta4.url}" color="#2f855a">${cta4.text}</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
}
