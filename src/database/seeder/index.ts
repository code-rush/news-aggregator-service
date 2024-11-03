import { dbClient } from '../connection';
import { NewArticle } from '../schema';
import { v4 as uuidv4 } from 'uuid';

const data = {
  "articles": [
    {
      "title" : "Medical schools and legislation aim to address a worsening doctor shortage that's already hitting rural communities",
      "published_on" : "2024-10-15T18:48:01.000Z",
      "description" : "Physician shortages are affecting rural communities. Medical schools and lawmakers could curb the effects, which are expected to worsen and spread.",
      "link" : "https:\/\/www.businessinsider.com\/doctor-shortage-limited-healthcare-medical-legislative-solutions-2024-10",
      "source" : "seed",
      "topic": "Medical",
      "state": "California",
    },
    {
      "title" : "OceanGate Faces Federal Investigation a Year After the Titan Submersible Implosion",
      "published_on" : "2024-10-25T13:57:34.000Z",
      "description" : "A US Attorney's office is investigating the company behind the doomed expedition to the wreck of the Titanic, sources tell WIRED, even as a civil suit is already underway.",
      "link" : "https:\/\/www.wired.com\/story\/oceangate-federal-investigation-titan-submersible-implosion\/",
      "source" : "seed",
      "topic": "Legislative",
      "state": "California",
    },
    {
      "title" : "California Governor Vetoes AI Bill Aimed at Preventing Catastrophic Harms",
      "published_on" : "2024-09-30T12:45:39.000Z",
      "description" : "California Governor Gavin Newsom said that by focusing only on the largest harms caused by the largest AI models the bill would harm innovation and fail to keep up with the pace of technology.",
      "link" : "https:\/\/gizmodo.com\/california-governor-vetoes-ai-bill-aimed-at-preventing-catastrophic-harms-2000504550",
      "source" : "seed",
      "topic": "Legislative",
      "state": "California",
    },
    {
      "title" : "Medical debt snares millions of people. States, red and blue are passing laws to help",
      "published_on" : "2024-10-07T09:00:00.000Z",
      "description" : "State lawmakers from both parties are expanding protections for patients burdened by medical debt.",
      "link" : "https:\/\/www.npr.org\/sections\/shots-health-news\/2024\/10\/07\/nx-s1-5135641\/medical-debt-solutions-hospitals-republicans-democrats-state-laws",
      "source" : "seed",
      "topic": "Medical",
      "state": "California",
    },
    {
      "title" : "When DEI is gone: A look at the fallout at one Texas university",
      "published_on" : "2024-10-13T10:05:11.000Z",
      "description" : "Students at the University of Texas-Austin have been in mourning as they watched the impact of anti-diversity, equity and inclusion (DEI) legislation on their campus.",
      "link" : "https:\/\/abcnews.go.com\/US\/dei-fallout-texas-university\/story?id=114470961",
      "source" : "seed",
      "topic": "Diversity",
      "state": "Texas",
    },
    {
      "title" : "California's Plastic Bag Ban Is Growing, But When Exactly Will It Take Effect?",
      "published_on" : "2024-10-01T18:21:00.000Z",
      "description" : "Plastic grocery bags are a significant contributor to global plastic pollution, and California is taking a big step up in tackling the problem.",
      "link" : "https:\/\/www.cnet.com\/news\/californias-plastic-bag-ban-is-growing-but-when-exactly-will-it-take-effect\/",
      "source" : "seed",
      "topic": "Ecological",
      "state": "California",
    },
    {
      "title" : "Muted mic, abortion rights and civility - top takeaways from VP debate",
      "published_on" : "2024-10-02T03:52:01.000Z",
      "description" : "Vance and Walz focused their attacks on Harris and Trump's plans on the economy, immigration and abortion.",
      "link" : "https:\/\/www.bbc.com\/news\/articles\/crr5j1q8wlno",
      "source" : "seed",
      "topic": "Economy",
      "state": "Virginia",
    },
    {
      "title" : "Proposal to allow Ariz. police to enforce immigration law to appear on state's ballot",
      "published_on" : "2024-10-15T18:43:19.000Z",
      "description" : "In Arizona voters will decide whether local law enforcement should have the power to arrest people who cross the state's southern border illegally.",
      "link" : "https:\/\/www.npr.org\/2024\/10\/15\/nx-s1-4992974\/proposal-to-allow-ariz-police-to-enforce-immigration-law-to-appear-on-states-ballot",
      "source" : "seed",
      "topic": "Immigration",
      "state": "Arizona",
    },
    {
      "title" : "Democrats are using January 6 to hammer the GOP in state legislative races in a push to flip key seats",
      "published_on" : "2024-10-23T10:05:44.000Z",
      "description" : "The Democratic Legislative Campaign Committee is revving up its push to defeat 2020 election deniers with just days left to go.",
      "link" : "https:\/\/www.businessinsider.com\/democrats-january-6-gop-state-legislative-races-trump-2024-10",
      "source" : "seed",
      "topic": "Legislative",
      "state": "California",
    },
    {
      "title" : "California Gov. Newsom vetoes AI bill, considered strictest in nation",
      "published_on" : "2024-09-29T22:18:59.000Z",
      "description" : "The measure, known as SB 1047, was one of the nation’s most far-reaching regulations on the booming AI industry. It would have held AI companies legally liable for harms caused by AI and enabled a \"kill switch\" if systems went rogue.",
      "link" : "https:\/\/www.npr.org\/2024\/09\/20\/nx-s1-5119792\/newsom-ai-bill-california-sb1047-tech",
      "source" : "seed",
      "topic": "Economy",
      "state": "California",
    },
    {
      "title" : "California governor vetoes controversial AI safety bill",
      "published_on" : "2024-09-30T14:15:33.000Z",
      "description" : "Newsom says SB-1047 ignored \"smaller, specialized models\" and curtailed innovation.",
      "link" : "https:\/\/arstechnica.com\/ai\/2024\/09\/california-governor-vetoes-controversial-ai-safety-bill\/",
      "source" : "seed",
      "topic": "Medical",
      "state": "Economy",
    },
    {
      "title" : "North Carolina government calculates Hurricane Helene damages, needs at least $53B",
      "published_on" : "2024-10-24T05:07:05.000Z",
      "description" : "The estimate includes damages and potential investments to prevent similar destruction in future storms.",
      "link" : "https:\/\/www.npr.org\/2024\/10\/24\/g-s1-29660\/north-carolina-hurricane-helene-damage",
      "source" : "seed",
      "topic": "Environment",
      "state": "North Carolina",
    },
    {
      "title" : "California Bans Sell-By Dates",
      "published_on" : "2024-10-07T11:39:03.000Z",
      "description" : "On September 28th Governor Gavin Newsom signed legislation making California the first state to ban sell-by dates. Assembly Bill No. 660 will take effect on July 1, 2026, banning the use of \"sell-by\" dates and standardizing language for date labels to reduce …",
      "link" : "https:\/\/www.foodandwine.com\/california-bans-sell-by-dates-8723111",
      "source" : "seed",
      "topic": "Legislative",
      "state": "California",
    },
    {
      "title" : "These swing-state counties are key to understanding the presidential race",
      "published_on" : "2024-10-27T09:00:00.000Z",
      "description" : "These counties will help tell the story of how either former President Donald Trump or Vice President Kamala Harris will become the next president.",
      "link" : "https:\/\/www.npr.org\/2024\/10\/27\/nx-s1-5164527\/swing-state-counties-election-harris-trump",
      "source" : "seed",
      "topic": "Legislative",
      "state": "California",
    },
    {
      "title" : "North Carolina lawmakers convene again to address Hurricane Helene's billions in damages",
      "published_on" : "2024-10-24T06:03:41.000Z",
      "description" : "North Carolina state legislators are returning to work to consider further relief for recovery from Hurricane Helene",
      "link" : "https:\/\/abcnews.go.com\/US\/wireStory\/north-carolina-lawmakers-convene-address-hurricane-helenes-billions-115094183",
      "source" : "seed",
      "topic": "Legislative",
      "state": "North Carolina",
    },
    {
      "title" : "Oil company Phillips 66 says it will shut down Los Angeles-area refinery",
      "published_on" : "2024-10-16T23:51:17.000Z",
      "description" : "Oil company Phillips 66 announced Wednesday that it plans to shut down a Los Angeles-area refinery by the end of 2025, citing market concerns.  The refinery ...",
      "link" : "https:\/\/finance.yahoo.com\/news\/oil-company-phillips-66-says-235117166.html",
      "source" : "seed",
      "topic": "Economy",
      "state": "California",
    },
    {
      "title" : "Florida Eases Licensing Requirements for Foreign Trained Doctors",
      "published_on" : "2024-10-25T03:42:11.000Z",
      "description" : "Earlier this year, the State of Florida enacted a new law, known as the Live Healthy initiative, that makes it easier for certain physicians trained abroad to become licensed as physicians in that state. The goal of the law is to increase the number of...",
      "link" : "https:\/\/www.murthy.com\/2024\/10\/17\/florida-eases-licensing-requirements-for-foreign-trained-doctors\/",
      "source" : "seed",
      "topic": "Medical",
      "state": "Florida",
    },
    {
      "title" : "Many of the small business owners Harris is targeting say they've never heard of a key economic proposal",
      "published_on" : "2024-10-16T10:19:01.000Z",
      "description" : "Five female entrepreneurs told BI they doubted most people, especially those in rural areas, know about Harris' plan to expand a key tax deduction.",
      "link" : "https:\/\/www.businessinsider.com\/small-business-entrepreneur-kamala-harris-tax-deduction-2024-10",
      "source" : "seed",
      "topic": "Economy",
      "state": "New York",
    },
    {
      "title" : "Melania Trump teases split with the GOP on abortion",
      "published_on" : "2024-10-03T14:04:12.000Z",
      "description" : "In a new video promoting her memoir, Melania Trump declares that there's \"no room for compromise\" when it comes to women's \"individual freedom.\"",
      "link" : "https:\/\/www.businessinsider.com\/melania-trump-split-republicans-abortion-rights-2024-10",
      "source" : "seed",
      "topic": "Medical",
      "state": "Virginia",
    },
    {
      "title" : "'I had to give up my dog to find somewhere to rent'",
      "published_on" : "2024-10-09T22:00:15.000Z",
      "description" : "Animal lovers are being forced to give up their pets in order to find somewhere to live.",
      "link" : "https:\/\/www.bbc.com\/news\/articles\/cx2mp2grx79o",
      "source" : "seed",
      "topic": "Ecological",
      "state": "Oregan",
    },
    {
      "title" : "Maryland seemed poised this year to legalize medical aid in dying. What happened?",
      "published_on" : "2024-09-30T11:00:00.000Z",
      "description" : "Most Americans support allowing some terminally ill patients to end their own lives. But a Maryland bill’s narrow defeat shows the issue is still religiously fraught and politically delicate.",
      "link" : "https:\/\/www.npr.org\/sections\/shots-health-news\/2024\/09\/29\/nx-s1-5130007\/maryland-terminal-cancer-legalize-medical-aid-in-dying-physician-assisted-suicide",
      "source" : "seed",
      "topic": "Medical",
      "state": "Florida",
    },
    {
      "title" : "The Online Safety Act is one year old. Has it made children any safer?",
      "published_on" : "2024-10-26T23:00:50.000Z",
      "description" : "Correspondent Angus Crawford has been following the progress of this much-heralded safety law for the last 12 months and explains whether it lives up to the hype",
      "link" : "https:\/\/www.bbc.com\/news\/articles\/c5y38z4pk9lo",
      "source" : "seed",
      "topic": "Medical",
      "state": "California",
    },
    {
      "title" : "Why Is the U.S. So Behind on Animal Welfare?",
      "published_on" : "2024-10-26T12:00:00.000Z",
      "description" : "Most Americans care about animals but a democracy deficit, big money, and lobbying lead to abusive factory farming, writes Peter Singer.",
      "link" : "https:\/\/time.com\/7098566\/us-behind-europe-animal-welfare\/",
      "source" : "seed",
      "topic": "Medical",
      "state": "California",
    }
  ]
};
  
async function seedData() {
  console.log('\n--------------------------------------------------------------------------------------------\n');
  console.log('seeding database\n');
  try {
    // TODO: write to db in a single transaction
    for (const article of data.articles) {
      const newArticle: NewArticle = {
        id: uuidv4(),
        title: article.title,
        source: article.source,
        description: article.description,
        state: article.state,
        topic: article.topic,
        published_on: new Date(article.published_on),
        link: article.link,
      };

      await dbClient
        .insertInto('articles')
        .values(newArticle)
        .execute();
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await dbClient.destroy();
  }

  console.log('\ndatabase seeding complete');
  console.log('\n--------------------------------------------------------------------------------------------\n');
};

seedData();
