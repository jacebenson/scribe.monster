import { CheckCircleIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  SimpleGrid,
  Flex,
  Link as ChakraLink,
  Box,
  Heading,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ResourcesPage = () => {
  return (
    <>
      <MetaTags title="Resources" description="Resources page" />
      {/**Make a two columns page with */}
      <SimpleGrid columns={2} spacing={10}>
        {/**Left column: */}
        <Box textAlign="center" py={10} px={6}>
          <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            How AI Works
          </Heading>
          <List textAlign={'left'} paddingLeft={10}>
            <ListItem>
              <ChakraLink href="https://youtu.be/Ok-xpKjKp2g" isExternal>
                How AI Works: Introducing How AI Works
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink href="https://youtu.be/KHbwOetbmbs" isExternal>
                How AI Works: What is Machine Learning
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink href="https://youtu.be/x2mRoFNm22g" isExternal>
                How AI Works: Training Data & Bias
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink href="https://youtu.be/JrXazCEACVo" isExternal>
                How AI Works: Nueral Networks
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink href="https://youtu.be/2hXG8v8p0KM" isExternal>
                How AI Works: Computer Vision
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink href="https://youtu.be/tJQSyzBUAew" isExternal>
                Ethics & AI - Equal Access & Algorithmic Bias
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink href="https://youtu.be/zNxw5gJtHLc" isExternal>
                Ethics & AI: Privacy and the Future of Work
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
          </List>
          <Text pl={10} color={'gray.500'} textAlign={'left'}></Text>
        </Box>
        <Box textAlign="center" py={10} px={6}>
          <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            My Favorite Resources
          </Heading>
          <List textAlign={'left'} paddingLeft={10}>
            <ListItem>
              <ChakraLink href="https://github.com/sw-yx/ai-notes" isExternal>
                Swyx AI Notes
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink href="https://youtu.be/GVsUOuSjvcg?t=217" isExternal>
                Future Computers Will Be Radically Different (Analog Computing)
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink
                href="https://lspace.swyx.io/p/open-source-ai"
                isExternal
              >
                Open Source is eating AI
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink
                href="https://docs.google.com/spreadsheets/d/1EuciDyKqFg2CIoQS89tF238oGtJq8a4mRx8kV9eA1Lc/edit#gid=2011839893"
                isExternal
              >
                List of 50+ Clever GPT-3 Prompts
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink href="https://www.gpt-list.com/" isExternal>
                List of gpt-powered products, features, and infrastucture
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink href="https://www.futuretools.io/" isExternal>
                FutureTools - Searchable + filterable list of AI Tools
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink
                href="https://beta.openai.com/docs/guides/completion/prompt-design"
                isExternal
              >
                OpenAI: Prompt Design
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink
                href="https://huggingface.co/openai-detector"
                isExternal
              >
                OpenAI Detector
                <ExternalLinkIcon mx="2px" />
              </ChakraLink>
            </ListItem>
          </List>
          <Text pl={10} color={'gray.500'} textAlign={'left'}></Text>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default ResourcesPage

/**
 * https://www.notion.so/brookechan/OpenAI-API-Community-Examples-ce088785e541498698c1895798e67664
 * Spell check
 * Poor English: Please provide me with a short brief of the design you’re looking for and that’d be nice if you could share some examples or project you did before.
Corrected English: Please provide me with a short brief of the design you’re looking for and some examples or previous projects you’ve done would be helpful.

Poor English: If I’m stressed out about something, I tend to have problem to fall asleep.
Corrected English: If I’m stressed out about something, I tend to have a problem falling asleep.

Poor English: There is plenty of fun things to do in the summer when your able to go outside.
Corrected English: There are plenty of fun things to do in the summer when you are able to go outside.

Poor English: She no went to the market.
Corrected English: She didn't go to the market.

  * Alliteration generator
  * Find synonyms for words that can create alliterations.

Sentence: The dog went to the store.
Alliteration: The dog drove to the department.

Sentence: David wears a hat everyday.
Alliteration: David dons a derby daily.

Sentence: The soap dries over night.
Alliteration: The soap shrivels succeeding sunset.


Email generator
[[Email Received:]]
Dear John
I am writing to ask whether you might be interested in reviewing a manuscript that has been submitted to Nature Machine Intelligence. The work comes from the lab of Jan Teller and is entitled “A neural quantum computer for learning entanglement”. Its abstract is pasted below.

Is this a paper that you would be interested and available to review for us, ideally within the next two weeks? Please let me know, either by replying to this email or by clicking the link below and following it to manuscript NATMACHINTELL-A20201929: https://mts-natmachintell.nature.com/cgi-bin/main.plex?el=A20201929

If you are unable to review this paper, we would be grateful if you could suggest potential alternative reviewers, keeping in mind that Nature-branded journals
stive toward an equitable demographic representation within our reviewer pool, for example, with respect to gender and geography. More information about our
commitment to diversity can be found here.

Thank you for your consideration.

With best regards,
Tony Jacobs, PhD
Senior Editor
Nature Machine Intelligence

[[Bullets:]]
* sorry
* not possible
* oversubscribed, two small children at home, wife has a full-time job
* good luck

[[Draft Reply:]]



passive voice to active voice
input: The book is being read by most of the class.
output: Most of the class is reading the book.
input: Results will be published in the next issue of the journal..
output: The researchers will publish their results in the next issue of the journal.
input: A policy of white-washing and cover-up has been pursued by the CIA director and his close advisors.
output: The CIA director and his close advisors have pursued a policy of white-washing and cover-up.
input: Mistakes were made.
output: We made mistakes.
input:
 */
