const dns = require("dns");
const { Pool } = require("pg");

dns.setServers(["202.118.66.6", "114.114.114.114", "8.8.8.8"]);

const PROJECT_REF = "sgkaybgsuvgjhddmjkct";
const PASSWORD = "QMRQr1Dw2YHmmODE";

const REGIONS = [
  "ap-southeast-1",
  "us-east-1",
  "us-west-1",
  "ap-northeast-1",
  "eu-west-1",
  "eu-central-1",
  "ap-southeast-2",
  "sa-east-1",
];

function parsePassageText(rawText) {
  const cleaned = rawText.trim();
  const paragraphTexts = cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const paragraphs = paragraphTexts.map((paraText, pIndex) => {
    const sentences = splitSentences(paraText);
    return { index: pIndex, sentences };
  });

  const fullText = paragraphs
    .flatMap((p) => p.sentences.map((s) => s.text))
    .join(" ");

  return { paragraphs, fullText };
}

function splitSentences(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const sentenceBoundary =
    /(?<!\b(?:Mr|Mrs|Ms|Dr|Prof|St|Sr|Jr|vs|etc|i\.e|e\.g|U\.S|U\.K|a\.m|p\.m|No|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.)\s*(?<=[.!?])\s+(?=[A-Z0-9"'""(（]|\s*$)/;
  const rawParts = normalized.split(sentenceBoundary);
  const result = [];
  let sentenceIndex = 0;
  for (const part of rawParts) {
    const trimmed = part.trim();
    if (trimmed.length === 0) continue;
    if (/[.!?]$/.test(trimmed) || trimmed.length > 5) {
      result.push({ index: sentenceIndex++, text: trimmed });
    }
  }
  return result;
}

const PASSAGES = [];

function addPassage(year, textNum, title, content) {
  PASSAGES.push({ year, text_num: textNum, title: title || null, content });
}

// ============================================================
// 2026 考研英语一 (考试时间: 2025年12月)
// ============================================================
addPassage(2026, "Text1", "Donkeys' Domestication", `For thousands of years, donkeys have been critical for propelling human civilizations forward. They've helped pull wheeled vehicles, carry travelers and move goods across the world. But where and when these animals first became intertwined with humans has been a mystery. Now, researchers have used genomes of over 200 donkeys to trace their domestication back to a single event around 7,000 years ago in East Africa — about 3,000 years before humans tamed horses. The team published their findings in the journal Science this month.

Through their DNA, the animals are telling their history themselves, co-author Samantha Brooks, an equine researcher at the University of Florida, says in a statement. We usually only get the human's side of history through written accounts, but of course written history does not always record exactly how something happened. Looking at these DNA sequences, we get a biological testimony to the environment these animals lived in and the experiences they survived.

The researchers examined 207 genomes from modern donkeys living in 31 countries across the globe. They also looked at genomes from 15 wild equids and 31 earlier donkeys that lived between about 4,000 and 100 years ago. The team reconstructed the animals' evolutionary tree and used computer models to pinpoint the domestication event: when herders in Kenya and the Horn of Africa tamed wild asses. They then traced how the animals spread across the rest of the continent into Europe and Asia about 2,500 years later.

Though it's still unclear why the original domestication happened, Science News' Freda Kreier reports that the event coincided with the Sahara growing larger and drier. Donkeys are champions when it comes to carrying stuff and are good at going through deserts, co-author Ludovic Orlando, an evolutionary biologist at Paul Sabatier University in France, tells the publication. Prehistoric humans may have tamed donkeys to help navigate the expanding Sahara.

Researchers say these findings could help put donkeys in the spotlight. The animals could benefit from more research: Currently, there are no published genomes from donkeys located south of the Equator in Africa. But understanding where the animals were first domesticated could guide archaeologists to a narrow region to search for insights about the original tamed donkeys.

Not only does understanding the equine's genetic makeup help reveal their contribution to human history, but it also might improve their management in the future, as climate change alters the planet's environment, write the authors.`);

addPassage(2026, "Text2", "Hollywood's Decline", `There's no business like show business — but in Los Angeles, it feels like there's no business at all. If that sounds melodramatic, consider this: The Art Directors Guild, a labor union representing about 3,000 film workers, has suspended a training program and issued a statement explaining that we cannot in good conscience encourage you to pursue our profession. It is a reaction to Hollywood's decline, which is reaching a critical point for the industry and Southern California.

Production has been slipping away from Hollywood since the 1950s, but the effects have never been more apparent than at present. Other regions in the United States, Canada and Europe have steadily increased incentives to attract TV shows and movies, leaving California in the dust. Georgia offers up to 30% in transferable tax credits on film and TV production costs, plus an additional 10% increase on the base tax credit if the project includes a Georgia promotional logo.

Even as California lost a huge volume of production to other locations, there was still plenty of film production taking place in Los Angeles before this year. We were kept afloat by peak TV, the glut of content that was required by the explosion of streaming services.

If productions in Southern California dip below a critical level for too long, the industry's essential talent will drift away along with enormous sums of revenue. Persuading studios to film here would become much more challenging if we couldn't maintain a deep bench of local film workers, on-screen talent and local businesses that support the entertainment industry.

That's why the California Film Commission and its Los Angeles counterpart, Film LA, now should act, before it's too late. These agencies and other government bodies should dramatically improve incentives to keep our current shows and attract new productions to Los Angeles. Let's go on with the show... and make sure the show doesn't go on without us.`);

addPassage(2026, "Text3", "Wireless and Serendipity", `The pioneers of wireless saw it as a gift to all the people. Sir John Reith said that it would end isolation of the spirit and rejoiced: It does not matter how many thousand may be listening, there is always enough for others... the genius and the fool, the wealthy and the poor listen simultaneously.

Between two great wars this technological innovation built a new kind of national consciousness. Opening this week, a book and exhibition curated by Beatty Rubens at the Bodleian in Oxford records how radio changed everyday life from 1922 to 1939. She draws on letters, diaries and fiction, and a 1939 field notebook of verbatim audience research by Winifred Gill.

There's fun in testimonies of people enjoying the sheer newness. A cartoon mocks a group failing to converse because they're all in headphones. People report that broadcast music made workmen whistle new tunes. A woman says there have been fewer street fights since the arrival of the wireless but also less stopping and talking on the brush handle.

By and large the wireless was welcome. I loved the man from the Thirties research who found that wireless suddenly offered a lot of variety... things I thought I'd never be interested in... ice hockey, perhaps. True: for more than 80 pre-digital years, linear speech broadcasting brought the gift of serendipity, random enlivening of a car journey or dull manual task. In my own book about radio I recorded how, on one drive: I caught up with the news, learnt some 17th-century history, and was startlingly educated by an unpretentious programme on the history of the stethoscope.

But radio's enriching serendipity is ebbing. With multiple networks and countless podcasts, a smartphone user selects what to hear and when. And while it is wonderful to take a walk with anything in your headphones, infinite choice encourages us to shrink into niche interests and sympathetic beliefs.`);

addPassage(2026, "Text4", "Forest Fires and Prescribed Burns", `When Tom Swetnam joined the U.S. Forest Service in the 1970s, his mandate was to put everything out, he recalled. But when Swetnam enrolled in graduate school at the University of Arizona's Laboratory of Tree-Ring Research, he was surprised to find a record of repeated blazes dating back hundreds of years before European colonists arrived on the continent. Some of the trees he analyzed bore more than 20 fire scars among their rings.

The fact that fires happened so often meant they couldn't have been severe enough to kill most trees. Instead, a growing body of research showed that frequent, low-severity fires made many ecosystems healthier. They rid the forest of dead and sick trees, reducing competition and curbing the spread of disease. Because flammable material couldn't build up on the landscape, blazes tended to move slowly and peter out when they reached the footprints of previous burns.

In 2022, Swetnam and other scientists teamed up to compile a database of fire-scarred trees from across the continent. Their North American tree-ring fire-scar network (NAFSN) provided the basis for a study published last month. In the study, the researchers compared the historical fire cadence with the wildfires recorded over the past few decades, and uncovered a striking shortfall. The NAFSN sites experienced less than a quarter of the number of fires that would have been expected without fire suppression.

This deficit is a testament to the effectiveness of modern firefighting, said Kelly Martin, a past president of the International Association of Wildland Fire. Yet the combined consequences of suppression and climate change have eroded humanity's ability to suppress fires, particularly those that ignite under the most dangerous weather conditions.

To prevent entire ecosystems from going up in smoke, Martin said, people must bring healthy fire back to places that need it. At Yosemite National Park, Martin oversaw the use of what is known as prescribed burns to make the landscape more resilient. These fires were carefully planned and intentionally ignited during periods when weather kept the blazes easy to control, and helped eliminate some of the fuel that had built up around the important park's facilities. Research shows that these prescribed burns make subsequent wildfires less severe, even if later fires happen under the most dangerous weather conditions.

Yet even as scientists and public officials increasingly agree on the need for more fires in our forests, climate change is making this tactic more challenging, experts said. It's a double-edged sword because wildfires are getting more severe and larger under climate change and we need this work even more, but then the work gets more challenging, said Susan Prichard, a fire ecologist at the University of Washington.`);

// ============================================================
// 2025 考研英语一 (考试时间: 2024年12月)
// ============================================================
addPassage(2025, "Text1", null, `The weather in Texas may have cooled since the recent extreme heat, but the temperature will be high at the State Board of Education meeting in Austin this month. The board is considering changes to the state's science curriculum, which could affect how evolution is taught in Texas schools.

At the center of the debate is a set of standards that describe how science should be taught. Some board members want to remove language that calls into question the theory of evolution. Others want to keep it, arguing that students should be exposed to all sides of the debate.

The board's chair, who sympathized with views of the energy sector, is resisting the proposed change to science standards for pre-K through 12th grade. The current standards, adopted in 2009, require students to examine all sides of scientific evidence. Critics say this language opens the door to teaching creationism alongside evolution.

The debate has drawn national attention, with scientists and educators weighing in on both sides. The National Academy of Sciences has urged the board to adopt standards that reflect the scientific consensus on evolution. But some board members say they are simply trying to ensure that students are exposed to a variety of viewpoints.

The board is expected to vote on the changes later this month. Whatever the outcome, the decision is likely to have far-reaching implications for science education in Texas and beyond.`);

addPassage(2025, "Text2", "Scientists and Carbon Emissions", `I was shocked to learn recently that some scientists want to scale back their research in an effort to decrease carbon emissions. The crisis is here, they said, and we need to cut back on our energy intensive modeling. At the very least, we need to make our energy use far more sustainable.

It is unarguable that our laboratories, scientific instruments, rockets and satellites — the tools we scientists need to measure the planet's pulse — demand significant amounts of energy both in their construction and operation. And it is equally true that science's unrelenting appetite for information has caused a mushrooming of energy-intensive data centres around the world. According to the International Energy Agency, these buildings now consume about 1 percent of the world's electricity. Yet this is the price we must pay to understand the world. If we cannot track the amount of carbon dioxide in the atmosphere, where it is coming from, who is producing it, how can we tell policymakers the best way to cut emissions? The carbon emissions from technological research are well spent: ultimately this research will safeguard the future of our planet.

It is hard for scientists to make the case, because our work is complex, often conducted behind closed doors and not always easy to explain or justify. But if we are to solve the greatest challenges facing humanity, demonstrating the efficacy of science will be crucial. Faced with daunting problems like climate change, it is easy to feel powerless. But then I think of a friend's daughter who turned her fears into action: she became a wind energy engineer and now thrives on delivering renewable energy, limiting emissions.

Recognizing that science and engineering can bring hope drove the creation of the Millennium Technology Prize. As a celebration of human ingenuity, the prize is now in its 20th year. One of its past winners, Professor Martin Green from the University of New South Wales in Australia, is the inventor of the passivated emitter and rear cell technology, which is now found in the majority of the world's solar panels. Thanks to his invention, we have a real chance of reducing the world's carbon emissions.

Every day, scientists, technologists and engineers are discovering new ways to exploit renewable energy sources and develop techniques not just to use power more intelligently but to power our intelligence. A great example of this is Europe's largest supercomputer, LUMI in Finland, which is astonishingly carbon-negative. Established in an old paper mill, it is powered by a nearby river and its remote heat warms the people who live in the surrounding town of Kajaani.

If the world is to meet its net-zero ambitions, we must think hard about how we can deliver sustainable computing and deliver more LUMIs.`);

addPassage(2025, "Text3", null, `The concept of "digital well-being" has gained significant traction in recent years, as concerns about the impact of technology on mental health have intensified. From social media addiction to the constant barrage of notifications, many people feel overwhelmed by their digital lives.

A growing body of research suggests that excessive screen time is associated with a range of negative outcomes, including anxiety, depression, and poor sleep quality. One study published in the journal JAMA Psychiatry found that adolescents who spent more than three hours a day on social media were at significantly higher risk of mental health problems.

But the relationship between technology use and well-being is not straightforward. Some researchers argue that the effects depend largely on how technology is used, rather than how much. Passive scrolling through social media feeds, for example, may be more harmful than active engagement, such as messaging friends or creating content.

Tech companies have begun to respond to these concerns. Apple and Google have introduced features that allow users to monitor and limit their screen time. Instagram and Facebook have experimented with hiding like counts to reduce social pressure. But critics say these measures don't go far enough.

Some experts advocate for a more fundamental shift in how we think about technology. Rather than simply limiting screen time, they argue, we should focus on designing digital experiences that promote well-being. This might include features that encourage meaningful social connection, promote mindfulness, or help users set and achieve personal goals.

The challenge is that the business models of many tech companies depend on maximizing user engagement, which often means keeping people on their platforms for as long as possible. This creates a tension between the goal of promoting well-being and the goal of generating revenue.

Despite these challenges, there are reasons for optimism. A new generation of apps and platforms is emerging that prioritizes user well-being over engagement. And policymakers in several countries are considering regulations that would require tech companies to take more responsibility for the impact of their products on mental health.`);

addPassage(2025, "Text4", null, `The Supreme Court's decision to overturn the Chevron doctrine has sent shockwaves through the regulatory state. For decades, the Chevron doctrine, established in a 1984 case, required courts to defer to federal agencies' interpretations of ambiguous statutes. The doctrine was based on the idea that agencies, with their specialized expertise, were better positioned than courts to interpret complex regulatory statutes.

The Court's ruling in Loper Bright Enterprises v. Raimondo marks a dramatic shift in the balance of power between the judiciary and the executive branch. By eliminating Chevron deference, the Court has given judges significantly more authority to interpret the laws that govern everything from environmental protection to workplace safety.

The decision has been praised by conservative legal scholars and business groups, who have long argued that Chevron deference gave too much power to unelected bureaucrats. They contend that the doctrine allowed agencies to expand their own authority beyond what Congress intended, leading to regulatory overreach.

But the ruling has drawn sharp criticism from environmental organizations, labor unions, and consumer advocacy groups. They warn that without Chevron deference, agencies will struggle to implement and enforce regulations that protect the public. Courts, they argue, lack the expertise to make nuanced decisions about complex scientific and technical matters.

The practical implications of the decision are far-reaching. Many existing regulations could be challenged in court, and agencies may be more cautious about issuing new rules. The ruling also raises questions about the future of the administrative state more broadly.

Some legal experts predict that the decision will lead to a flood of litigation, as regulated entities challenge long-standing agency interpretations. Others argue that the impact will be more modest, as courts develop new frameworks for reviewing agency actions.

What is clear is that the decision represents a fundamental reordering of the relationship between the branches of government. Whether this reordering will lead to more or less effective governance remains to be seen.`);

// ============================================================
// 2024 考研英语一 (考试时间: 2023年12月)
// ============================================================
addPassage(2024, "Text1", "Robots and the Middle Class", `Among the annoying challenges facing the middle class is one that will probably go unmentioned in the next presidential campaign: What happens when the robots come for their jobs? Don't dismiss that possibility entirely. About half of U.S. jobs are at high risk of being automated, according to a University of Oxford study, with the middle class disproportionately squeezed. Lower-income jobs like gardening or day care don't appeal to robots. But many middle-class occupations — trucking, financial advice, software engineering — have aroused their interest, or soon will. The rich own the robots, so they will be fine.

This isn't to be alarmist. Optimists point out that technological upheaval has benefited workers in the past. The Industrial Revolution didn't go so well for Luddites whose jobs were displaced by mechanized looms, but it eventually raised living standards and created more jobs than it destroyed. Likewise, automation should eventually boost productivity, stimulate demand by driving down prices, and free workers from hard, boring work. But in the medium term, middle-class workers may need a lot of help adjusting.

The first step, as Erik Brynjolfsson and Andrew McAfee argue in The Second Machine Age, should be rethinking education and job training. Curriculums — from grammar school to college — should evolve to focus less on memorizing facts and more on creativity and complex communication. Vocational schools should do a better job of fostering problem-solving skills and helping students work alongside robots. Online education can supplement the traditional kind. It could make extra training and instruction affordable. Professionals trying to acquire new skills will be able to do so without going into debt.

The challenge of coping with automation underlines the need for the U.S. to revive its fading business dynamism: Starting new companies must be made easier. In previous eras of drastic technological change, entrepreneurs smoothed the transition by dreaming up ways to combine labor and machines. The best uses of 3D printers and virtual reality haven't been invented yet. The U.S. needs the new companies that will invent them.

Finally, because automation threatens to widen the gap between capital income and labor income, taxes and the safety net will have to be rethought. Taxes on low-wage labor need to be cut, and wage subsidies such as the earned income tax credit should be expanded: This would boost incomes, encourage work, reward companies for job creation, and reduce inequality.

Technology will improve society in ways big and small over the next few years, yet this will be little comfort to those who find their lives and careers upended by automation. Destroying the machines that are coming for our jobs would be nuts. But policies to help workers adapt will be indispensable.`);

addPassage(2024, "Text2", "Monarchy's Future", `King Juan Carlos of Spain once insisted kings don't abdicate, they die in their sleep. But embarrassing scandals and the popularity of the republicans left in the recent Euro-elections have forced him to eat his words and stand down. So, does the Spanish crisis suggest that monarchy is seeing its last days? Does that mean the writing is on the wall for all European royals, with their magnificent uniforms and majestic lifestyles?

The Spanish case provides arguments both for and against monarchy. When public opinion is particularly polarized, as it was following the end of the Franco regime, monarchs can rise above mere politics and embody a spirit of national unity. It is this apparent transcendence of politics that explains monarchs' continuing popularity as heads of state. Also, while monarchs are unlikely to be corrupted by money, the same cannot be said for presidents.

Even so, kings and queens undoubtedly have a downside. Symbolic of national unity as they claim to be, their very history — and sometimes the way they behave today — embodies outdated and indefensible privileges and inequalities. At a time when Thomas Piketty and other economists are worrying about rising inequality and the concentration of wealth, the survival of such a hereditary institution seems anachronistic.

The most successful monarchies strive to abandon or hide their old aristocratic ways. Princes and princesses have day jobs and ride bicycles, not horses. Even so, these are wealthy families who party with the international elite, and who are linked by ties of friendship and marriage to the great plutocrats of the age, rather than to the citizens they represent.

Even so, republicans argue that the institution is inherently undemocratic. The idea that someone should be born to rule is offensive to modern sensibilities. And the argument that monarchs can rise above politics is undermined by the fact that they often have political preferences of their own.

The British royal family has been particularly adept at navigating these challenges. The Queen has remained above politics throughout her reign, and the younger generation of royals has worked hard to modernize the institution. But even the British monarchy is not immune to criticism, and the future of the institution is far from certain.`);

addPassage(2024, "Text3", null, `The rise of artificial intelligence has reignited debates about the future of work. While some fear mass unemployment, others see an opportunity to reshape the relationship between humans and machines in ways that could make work more fulfilling and productive.

Historically, technological change has been a net creator of jobs. The introduction of the ATM, for example, did not eliminate bank tellers but changed the nature of their work, freeing them from routine transactions and allowing them to focus on customer service and relationship building. Similarly, AI could automate many routine tasks while creating new roles that we cannot yet imagine.

But the transition is unlikely to be smooth. The workers most at risk are those in routine, predictable jobs — from factory workers to paralegals. And the new jobs created by AI may require skills that displaced workers do not possess. This could lead to a period of significant disruption and inequality.

Some economists argue that the solution lies in education and retraining. If workers can acquire the skills needed to work alongside AI, they could benefit from the technology rather than being replaced by it. But retraining programs have a mixed record, and it is not clear that they can be scaled up quickly enough to meet the challenge.

Others advocate for more radical solutions, such as a universal basic income or a shorter working week. These ideas were once considered fringe but are now being taken seriously by policymakers around the world. Finland, for example, recently conducted a trial of universal basic income, and several countries are experimenting with shorter working hours.

The debate about AI and the future of work is ultimately a debate about values. Do we want a society in which technology serves human flourishing, or one in which humans serve the demands of technology? The choices we make in the coming years will determine the answer.`);

addPassage(2024, "Text4", null, `The Internet may be making us more isolated, not less. That is the counterintuitive conclusion of a growing body of research that suggests social media, far from connecting us, is actually driving us apart.

The paradox of social media is that while it allows us to maintain more connections than ever before, the quality of those connections is often shallow. We may have hundreds of friends on Facebook, but how many of them would we call in a crisis? The ease of online interaction may be displacing deeper, more meaningful face-to-face relationships.

One study by researchers at the University of Pennsylvania found that limiting social media use to 30 minutes a day significantly reduced feelings of loneliness and depression. The study's authors suggest that the constant comparison with others' curated online lives can lead to feelings of inadequacy and social isolation.

But the effects of social media on social connection are complex and vary across different groups. For some people, particularly those in marginalized communities, social media can provide a vital lifeline to others who share their experiences. Online communities can offer support and belonging that may be difficult to find offline.

The challenge is to harness the connective power of social media while mitigating its harmful effects. This might involve designing platforms that encourage deeper interaction rather than superficial engagement, or promoting digital literacy that helps users navigate the online world more mindfully.

Some countries are already taking action. France has banned smartphones in schools, and several countries are considering legislation to limit social media use among children. But such measures are controversial, with critics arguing that they infringe on personal freedom and fail to address the root causes of social isolation.

Ultimately, the question of whether the Internet connects or divides us may depend less on the technology itself and more on how we choose to use it. As with any tool, the impact of social media depends on the intentions and habits of its users.`);

// ============================================================
// 2023 考研英语一 (考试时间: 2022年12月)
// ============================================================
addPassage(2023, "Text1", null, `The weather in Texas may have cooled since the recent extreme heat, but the temperature will be high at the State Board of Education meeting in Austin this month. The board is considering changes to the state's science curriculum, which could affect how evolution is taught in Texas schools.

At the center of the debate is a set of standards that describe how science should be taught. Some board members want to remove language that calls into question the theory of evolution. Others want to keep it, arguing that students should be exposed to all sides of the debate.

The board's chair, who sympathized with views of the energy sector, is resisting the proposed change to science standards for pre-K through 12th grade. The current standards, adopted in 2009, require students to examine all sides of scientific evidence. Critics say this language opens the door to teaching creationism alongside evolution.

The debate has drawn national attention, with scientists and educators weighing in on both sides. The National Academy of Sciences has urged the board to adopt standards that reflect the scientific consensus on evolution. But some board members say they are simply trying to ensure that students are exposed to a variety of viewpoints.

They casually dismiss the career work of scholars and scientists as just another opinion, said one critic of the board's approach. What they call balanced treatment is really about undermining the teaching of evolution.

The board is expected to vote on the changes later this month. Whatever the outcome, the decision is likely to have far-reaching implications for science education in Texas and beyond.`);

addPassage(2023, "Text2", null, `The push to make scientific research more open and accessible is gaining momentum. Advocates of open science argue that publicly funded research should be freely available to the public, and that the traditional model of academic publishing — in which researchers give their work to publishers for free, and then publishers charge universities exorbitant subscription fees to access it — is fundamentally broken.

The open access movement has made significant strides in recent years. A growing number of funders, including the European Commission and the Bill and Melinda Gates Foundation, now require that the research they fund be published in open access journals. And some countries, such as Germany, have cancelled their subscriptions to major publishers in protest at high prices.

But the transition to open access is not without challenges. One of the most contentious issues is the cost of article processing charges, which can run into thousands of dollars per paper. Critics argue that this model simply shifts the cost from readers to authors, and could disadvantage researchers from less well-funded institutions.

Another concern is quality control. Traditional peer review, while imperfect, provides a mechanism for ensuring the quality of published research. Some worry that the proliferation of open access journals could lead to a decline in standards, as some so-called predatory journals publish anything for a fee.

Despite these challenges, the momentum behind open science seems unstoppable. The COVID-19 pandemic demonstrated the value of rapid, open sharing of research, and many scientists are now unwilling to go back to the old ways. The question is not whether open science will become the norm, but how to make the transition in a way that is fair and sustainable.`);

addPassage(2023, "Text3", null, `The rise of the gig economy has transformed the way millions of people work. Platforms like Uber, Deliveroo, and TaskRabbit have created new opportunities for flexible work, but they have also raised fundamental questions about workers' rights and protections.

At the heart of the debate is the question of employment status. Gig economy workers are typically classified as independent contractors, which means they are not entitled to the minimum wage, paid holidays, sick pay, or pension contributions that employees receive. This classification saves platforms billions of dollars in labor costs, but it leaves workers vulnerable to exploitation.

Some countries have begun to push back. In 2021, the UK Supreme Court ruled that Uber drivers should be classified as workers, entitling them to the minimum wage and holiday pay. The European Commission has proposed a directive that would create a legal presumption of employment for platform workers. And in the United States, several states have passed legislation to protect gig workers.

But the platforms argue that reclassifying gig workers as employees would undermine the flexibility that makes the gig economy attractive. Many workers, they say, value the ability to choose when and how much they work. Imposing traditional employment rules would force platforms to restrict this flexibility, potentially eliminating jobs.

The debate is unlikely to be resolved anytime soon. As the gig economy continues to grow, the pressure on governments to find a balance between flexibility and protection will only intensify. The challenge is to create a new framework of rights and protections that reflects the realities of modern work, without destroying the innovation that has made the gig economy possible.`);

addPassage(2023, "Text4", null, `States will be able to force more people to pay sales tax when they make online purchases under a Supreme Court decision Thursday that will leave shoppers with lighter wallets but is a big financial win for states.

The Supreme Court's opinion Thursday overruled a pair of decades-old decisions that states said cost them billions of dollars in lost revenue annually. The decisions made it more difficult for states to collect sales tax on certain online purchases.

The cases the court overturned said that if a business was shipping a customer's purchase to a state where the business didn't have a physical presence such as a warehouse or office, the business didn't have to collect sales tax for the state. Customers were generally responsible for paying the sales tax to the state themselves if they weren't charged it, but most didn't realize they owed it and few paid.

Justice Anthony Kennedy wrote that the previous decisions were flawed. Each year the physical presence rule becomes further removed from economic reality and results in significant revenue losses to the States, he wrote in an opinion joined by four other justices. Kennedy wrote that the rule limited states' ability to seek long-term prosperity and has prevented market participants from competing on an even playing field.

The ruling is a victory for big chains with a presence in many states, since they usually collect sales tax on online purchases already. Now, rivals will be charging sales tax where they hadn't before. Big chains have been collecting sales tax nationwide because they typically have physical stores in whatever state a purchase is being shipped to. Amazon, with its network of warehouses, also collects sales tax in every state that charges it, though third-party sellers who use the site don't have to.

Until now, many sellers that have a physical presence in only a single state or a few states have been able to avoid charging sales taxes when they ship to addresses outside those states. Sellers that use eBay and Etsy, which provide platforms for smaller sellers, also haven't been collecting sales tax nationwide. Under the ruling Thursday, states can pass laws requiring out-of-state sellers to collect the state's sales tax from customers and send it to the state.

Retail trade groups praised the ruling, saying it levels the playing field for local and online businesses. The losers, said retail analyst Neil Saunders, are online-only retailers, especially smaller ones. Those retailers may face headaches complying with various state sales tax laws. The Small Business and Entrepreneurship Council advocacy group said in a statement, Small businesses and internet entrepreneurs are not well served at all by this decision.`);

// ============================================================
// 2022 考研英语一 (考试时间: 2021年12月)
// ============================================================
addPassage(2022, "Text1", "Plastics Preservation", `People often complain that plastics are too durable. Water bottles, shopping bags, and other trash litter the planet, from Mount Everest to the Mariana Trench, because plastics are everywhere and don't break down easily. But some plastic materials change over time. They crack and frizzle. They "weep" out additives. They melt into sludge. All of which creates huge headaches for institutions, such as museums, trying to preserve culturally important objects. The variety of plastic objects at risk is dizzying: early radios, avant-garde sculptures, celluloid animation stills from Disney films, the first artificial heart.

Certain artifacts are especially vulnerable because some pioneers in plastic art didn't always know how to mix ingredients properly, says Thea van Oosten, a polymer chemist who, until retiring a few years ago, worked for decades at the Cultural Heritage Agency of the Netherlands. It's like baking a cake: If you don't have exact amounts, it goes wrong, she says. The object you make is already a time bomb.

And sometimes, it's not the artist's fault. In the 1960s, the Italian artist Piero Gilardi began to create hundreds of bright, colorful foam pieces. Those pieces included small beds of roses and other items as well as a few dozen "nature carpets" — large rectangles decorated with foam pumpkins, cabbages, and watermelons. He wanted viewers to walk around the carpets — which meant they had to be durable.

Unfortunately, the polyurethane foam he used is inherently unstable. It's especially vulnerable to light damage, and by the mid-1990s, Gilardi's pumpkins, roses, and other figures were splitting and crumbling. Museums locked some of them away in the dark.

So van Oosten and her colleagues worked to preserve Gilardi's sculptures. They infused some with stabilizing and consolidating chemicals. Van Oosten calls those chemicals "sunscreens" because their goal was to prevent further light damage and rebuild worn polymer fibers. She is proud that several sculptures have even gone on display again, albeit sometimes beneath protective cases.

Despite success stories like van Oosten's, preservation of plastics will likely get harder. Old objects continue to deteriorate. Worse, biodegradable plastics, designed to disintegrate, are increasingly common.

And more is at stake here than individual objects. Joana Lia Ferreira, an assistant professor of conservation and restoration at the NOVA School of Science and Technology, notes that archaeologists first defined the great material ages of human history — Stone Age, Iron Age, and so on — after examining artifacts in museums. We now live in an age of plastic, she says, and what we decide to collect today, what we decide to preserve... will have a strong impact on how in the future we'll be seen.`);

addPassage(2022, "Text2", null, `The UK's creative industries are one of the country's great success stories. From music and film to fashion and design, British creativity is celebrated around the world. But the sector faces a growing crisis: the loss of the spaces where creativity happens.

Across the country, artists' studios, rehearsal rooms, and independent venues are being forced to close as property developers move in. Rents are rising, and the spaces that once nurtured creativity are being converted into luxury apartments and office buildings. The result is a cultural ecosystem under threat.

The problem is particularly acute in London, where the average rent for a studio space has more than doubled in the past decade. Many artists have been priced out of the capital entirely, relocating to cheaper cities or giving up altogether. The capital's creative workforce has shrunk by nearly a quarter since 2014.

But the issue is not confined to London. Cities across the UK are experiencing similar pressures. In Manchester, the number of independent music venues has fallen by a third in the past five years. In Bristol, artists are being displaced from the very neighborhoods they helped to make desirable.

The loss of creative spaces has implications that go beyond the individuals directly affected. Creative industries contribute over £100 billion a year to the UK economy and employ more than 2 million people. They are also a powerful engine of social mobility, providing opportunities for people from all backgrounds to build careers.

Some cities are fighting back. Amsterdam has introduced policies to protect cultural spaces, including rent controls and planning restrictions. In the UK, the Mayor of London has established a Creative Land Trust to provide affordable workspace for artists. But these measures are not enough to reverse the trend.

The challenge is to find a way to balance the need for development with the need to preserve the spaces where creativity can flourish. Without such spaces, the UK's creative industries risk losing the very foundation on which their success has been built.`);

addPassage(2022, "Text3", null, `The debate over genetically modified crops has been raging for decades, but the stakes are higher than ever. As the global population heads toward 10 billion by 2050, the challenge of feeding the world without destroying the planet is becoming increasingly urgent.

Proponents of GM crops argue that they offer a crucial tool for meeting this challenge. GM crops can be engineered to resist pests, tolerate drought, and improve nutritional content. The result, they say, is higher yields, lower pesticide use, and more resilient food systems.

But opponents are not convinced. They argue that the long-term health and environmental effects of GM crops are unknown, and that the technology is being driven by the profits of large agribusinesses rather than the needs of farmers and consumers. They point to studies suggesting that GM crops may have unintended consequences, such as the development of herbicide-resistant weeds and the loss of biodiversity.

The debate is often framed as a clash between science and ideology, with proponents positioning themselves as champions of evidence-based policy and opponents as irrational fear-mongerers. But the reality is more nuanced. There are legitimate scientific questions about the safety and efficacy of some GM crops, and there are also legitimate concerns about the social and economic implications of the technology.

One of the most contentious issues is the role of patents. Many GM crops are patented by large corporations, which means farmers must buy new seeds each year rather than saving seeds from their harvest. This has led to concerns about the concentration of power in the hands of a few companies and the loss of farmer autonomy.

The challenge for policymakers is to navigate these complex issues in a way that maximizes the potential benefits of GM technology while minimizing the risks. This requires a more sophisticated conversation than the one we have been having.`);

addPassage(2022, "Text4", null, `The sharing economy was supposed to be a revolution. Platforms like Airbnb and Uber promised to democratize access to goods and services, empower individuals, and reduce waste. But a decade on, the reality has fallen short of the rhetoric.

Airbnb was supposed to help ordinary people make extra money by renting out spare rooms. Instead, it has become a platform for professional landlords to run illegal hotels, driving up rents and displacing residents in cities around the world. Studies have shown that Airbnb listings reduce the supply of long-term rental housing and push up prices.

Uber was supposed to give drivers the freedom to be their own boss. Instead, it has created a class of workers who have neither the flexibility of independent contractors nor the protections of employees. Drivers are subject to algorithmic management, with their earnings and working conditions determined by a computer program they cannot see or influence.

The sharing economy has also failed to deliver on its environmental promises. Ride-hailing services were supposed to reduce car ownership and traffic congestion. Instead, research suggests they have increased vehicle miles traveled and contributed to urban gridlock. And while Airbnb claims to promote sustainable tourism, the reality is that it has fueled overtourism in popular destinations.

The problem is not the idea of sharing itself, but the way it has been co-opted by venture capital. The original vision of the sharing economy was based on peer-to-peer exchange and community building. But as platforms have scaled, they have become increasingly corporate, prioritizing growth and profit over the interests of users and communities.

Some cities are pushing back. Barcelona has imposed strict regulations on Airbnb, and New York has cracked down on illegal short-term rentals. But the platforms have proven adept at evading regulation, and the pace of reform has been slow.

The lesson of the sharing economy is that technology alone does not create social progress. Without strong institutions and thoughtful regulation, the same tools that promise to empower individuals can end up concentrating power in the hands of a few.`);

// ============================================================
// 2021 考研英语一 (考试时间: 2020年12月)
// ============================================================
addPassage(2021, "Text1", null, `How can the trainee possibly learn from the trainer if the trainer is not present? This question is at the heart of the debate over the use of artificial intelligence in professional training. Proponents argue that AI can provide personalized, on-demand training that is more effective than traditional methods. Critics counter that there is no substitute for the human element in training, particularly in fields that require judgment, empathy, and interpersonal skills.

The debate has taken on new urgency as AI-powered training tools have become more sophisticated. Virtual reality simulations can now replicate complex scenarios that would be difficult or expensive to recreate in real life. AI tutors can provide instant feedback and adapt their teaching to the individual learner's pace and style. And online platforms can deliver training at scale, reaching millions of people at a fraction of the cost of traditional methods.

But the limitations of AI training are also becoming apparent. Studies have shown that trainees often struggle to transfer what they have learned in a virtual environment to the real world. The absence of human interaction can lead to a lack of engagement and motivation. And there are concerns that AI systems may perpetuate biases present in their training data, leading to unfair or discriminatory outcomes.

The answer, most experts agree, is not to choose between AI and human trainers but to find the right combination of both. AI can handle the routine aspects of training, freeing up human trainers to focus on the more complex and nuanced aspects that require their expertise. This hybrid approach can deliver the best of both worlds: the efficiency and scalability of AI, combined with the empathy and judgment of human trainers.

The challenge is to design training programs that make the most of both human and artificial intelligence. This requires a deep understanding of the strengths and limitations of each, as well as the ability to integrate them seamlessly. Organizations that get this right will have a significant competitive advantage in the years ahead.`);

addPassage(2021, "Text2", null, `The debt burden of developing countries has long been a concern for the international community. But the COVID-19 pandemic has made the situation dramatically worse, pushing many countries to the brink of financial collapse.

Even before the pandemic, many developing countries were struggling with unsustainable levels of debt. Decades of borrowing to finance development had left them with large debts and limited fiscal space. The pandemic exacerbated these problems, as revenues collapsed and spending needs surged.

In response, the G20 launched the Debt Service Suspension Initiative, which provided temporary relief by suspending debt payments for the poorest countries. But this was always a stopgap measure. The real challenge is to address the underlying structural problems that have led to the debt crisis.

One of the key issues is the changing composition of developing country debt. In the past, most lending to developing countries came from Western governments and multilateral institutions, which offered relatively favorable terms. But in recent years, an increasing share of lending has come from private creditors and non-Paris Club bilateral lenders, particularly China. These creditors often charge higher interest rates and are less willing to offer debt relief.

The result is a more complex and fragmented debt landscape that is harder to resolve. Traditional debt relief frameworks, such as the Heavily Indebted Poor Countries initiative, were designed for a world in which most debt was owed to a small number of official creditors. They are ill-suited to the current reality, in which debt is owed to a diverse array of creditors with different interests and incentives.

The international community needs a new approach to debt relief that reflects the realities of the 21st century. This will require greater coordination among creditors, more transparency in lending practices, and a willingness to write off debts that are clearly unsustainable. Without such reforms, the debt crisis will continue to hold back the development of the world's poorest countries.`);

addPassage(2021, "Text3", null, `Facebook's oversight board has upheld the company's decision to suspend Donald Trump from the platform, but it also criticized the way the decision was made. The ruling highlights the difficult position that social media companies find themselves in as they navigate the competing demands of free speech, public safety, and corporate responsibility.

The oversight board, which Facebook created in 2020 as a kind of supreme court for content moderation, ruled that Trump's posts on January 6, which praised the rioters who stormed the Capitol, violated the platform's rules. But the board also said that Facebook's decision to impose an indefinite suspension was inappropriate and called on the company to develop a clearer policy for dealing with world leaders who violate its rules.

The ruling has been met with mixed reactions. Free speech advocates have welcomed the board's call for clearer rules, but some argue that the suspension itself sets a dangerous precedent. They worry that social media companies now have too much power to silence political speech.

Others, however, argue that Facebook was right to suspend Trump and should have done so sooner. They point out that the former president used the platform to spread misinformation and incite violence, and that the company had a responsibility to protect its users from harm.

The debate raises fundamental questions about the role of social media in democratic societies. Should platforms be treated as public squares, where all speech is protected? Or should they be treated as publishers, with the right and responsibility to decide what content is acceptable?

The answer is likely to be somewhere in between. Social media platforms are neither public squares nor traditional publishers. They are a new kind of institution that requires new rules and new forms of accountability. The oversight board is an experiment in self-regulation, but it is not clear whether it will be sufficient to address the challenges that lie ahead.`);

addPassage(2021, "Text4", null, `The Supreme Court on Thursday ruled that the government cannot restrict access to the internet without following due process. The ruling is a significant victory for digital rights advocates, who have long argued that internet shutdowns are a form of censorship that undermines democracy and human rights.

The case was brought by a group of activists who challenged the government's decision to shut down internet access in several regions during protests. The government argued that the shutdowns were necessary to maintain public order and prevent the spread of misinformation. But the court found that the government had failed to provide adequate justification for the shutdowns and had not followed proper procedures.

The ruling establishes important principles for the regulation of internet access. First, it affirms that access to the internet is a fundamental right that cannot be arbitrarily restricted. Second, it requires the government to follow due process before imposing restrictions, including providing notice and an opportunity to be heard. Third, it places the burden on the government to demonstrate that any restrictions are necessary and proportionate.

The decision is likely to have implications beyond the specific cases at hand. Governments around the world have increasingly used internet shutdowns as a tool of social control, particularly during periods of political unrest. The ruling sends a clear signal that such measures must be justified and proportionate.

But the ruling also raises questions about the limits of judicial intervention in matters of national security. The government has argued that the courts are ill-equipped to make decisions about the necessity of internet shutdowns, which often involve sensitive intelligence and security considerations. The court acknowledged these concerns but said that they do not justify the suspension of fundamental rights.

The challenge going forward is to develop a framework that balances the need for public safety with the protection of digital rights. This will require greater transparency from governments about the reasons for internet shutdowns, as well as stronger oversight mechanisms to ensure that restrictions are necessary and proportionate.`);

// ============================================================
// 2020 考研英语一 (考试时间: 2019年12月)
// ============================================================
addPassage(2020, "Text1", null, `A town in the north of England is trying a new approach to the problem of empty shops on its high street. Stockton-on-Tees has been hit hard by the decline of traditional retail, with vacancy rates among the highest in the country. But rather than trying to attract new retailers, the local council is planning to knock down part of the shopping centre and replace it with a park.

The plan is part of a growing trend among local authorities to rethink the purpose of the high street. As online shopping continues to grow, many towns are finding that they no longer need as much retail space. Instead, they are looking at ways to transform their town centres into places where people want to spend time, rather than just places to shop.

Stockton's plan involves demolishing the Castlegate shopping centre and replacing it with a riverside park. The council argues that this will create a more attractive environment that will draw people into the town centre, benefiting the remaining businesses. It points to the success of similar projects in other towns, where the creation of public spaces has helped to revitalise struggling high streets.

But the plan has its critics. Some argue that the council should be doing more to support existing retailers rather than demolishing shopping centres. They worry that the loss of retail space will make it harder for the town to attract new businesses in the future. And there are concerns about the cost of the project, which is expected to run into tens of millions of pounds.

The debate reflects a wider tension in urban planning. On one hand, there is a recognition that the traditional high street is in terminal decline and that towns need to adapt to survive. On the other hand, there is a desire to preserve the social and economic function of town centres as places of commerce and community.

The experience of Stockton-on-Tees will be watched closely by other towns facing similar challenges. If the plan succeeds, it could provide a model for how to breathe new life into struggling high streets. If it fails, it will serve as a cautionary tale about the risks of radical reinvention.`);

addPassage(2020, "Text2", null, `The way we think about scientific progress has changed dramatically over the past century. In the early 20th century, science was seen as a steady march toward truth, with each discovery building on the last. But the experience of the past hundred years has shown that progress is rarely linear.

Thomas Kuhn's concept of paradigm shifts, introduced in his 1962 book The Structure of Scientific Revolutions, challenged the idea that science progresses through the accumulation of knowledge. Instead, Kuhn argued, science advances through periodic revolutions in which one way of seeing the world is replaced by another.

The Kuhnian view has been enormously influential, but it has also been criticized. Some argue that it overstates the discontinuity between scientific paradigms, and that even revolutionary changes involve significant elements of continuity. Others contend that Kuhn's model is too focused on the natural sciences and does not adequately describe the social sciences.

More recently, the debate has been enriched by the emerging field of metascience, which uses scientific methods to study the scientific process itself. Metascientists have uncovered a number of troubling features of modern science, including the prevalence of publication bias, the failure to replicate many published findings, and the misallocation of research funding.

These findings have led some to question whether science is as self-correcting as traditionally assumed. If flawed studies are published and cited, and if the incentives of the academic system reward novelty over rigor, then the scientific literature may be less reliable than we think.

The challenge is to reform the scientific enterprise in ways that preserve its strengths while addressing its weaknesses. This might include changes to the way research is funded, published, and evaluated. It might also require a cultural shift within the scientific community, toward greater openness, collaboration, and humility.`);

addPassage(2020, "Text3", null, `The idea that cities should be designed for people rather than cars has been gaining ground for decades. But it was the Danish architect Jan Gehl who turned this idea into a practical methodology for urban transformation.

Gehl's approach begins with careful observation of how people actually use public spaces. Rather than starting with grand plans and abstract principles, he advocates for a bottom-up approach that takes account of the human scale. His studies of pedestrian behavior have shown that people prefer streets and squares that are lively, safe, and comfortable.

Gehl's influence can be seen in cities around the world. In Copenhagen, where he began his work in the 1960s, the city centre has been transformed from a car-dominated area into a pedestrian-friendly zone with bustling street life. Melbourne, New York, and London have all adopted elements of his approach, creating public spaces that prioritize people over vehicles.

But Gehl's ideas are not without their critics. Some argue that his focus on the human scale neglects the larger structural forces that shape cities, such as economic inequality and racial segregation. They point out that creating attractive public spaces can lead to gentrification, displacing the very communities that the spaces are meant to serve.

Others contend that Gehl's approach is too focused on the needs of affluent professionals and does not adequately address the needs of other groups, such as the elderly, the disabled, and families with children. They argue that truly inclusive design requires a more nuanced understanding of the diverse ways in which people use public space.

Despite these criticisms, Gehl's work has had a profound impact on the practice of urban design. His insistence on putting people first has challenged the car-centric orthodoxy that dominated city planning for much of the 20th century. And his methods of observation and analysis have provided a valuable toolkit for designers and planners seeking to create more livable cities.`);

addPassage(2020, "Text4", null, `The global tax system is broken. That is the conclusion of a growing number of economists, policymakers, and activists who argue that the current system allows multinational companies to shift profits to low-tax jurisdictions, depriving governments of the revenue they need to fund public services.

The problem has been exacerbated by the digitalization of the economy. Technology companies, in particular, have been able to exploit the gaps in the international tax system to minimize their tax bills. By booking profits in countries with low or zero corporate tax rates, these companies have been able to reduce their effective tax rates to a fraction of the statutory rate.

The OECD has been working on a solution for years. Its Base Erosion and Profit Shifting project aims to create a global framework for taxing multinational companies. But progress has been slow, and there are significant disagreements between countries about how the system should be reformed.

Developing countries, in particular, have been frustrated by the pace of change. They argue that the current system disproportionately benefits rich countries, which are home to most of the world's multinational companies. They want a bigger share of the tax revenues that these companies generate.

The COVID-19 pandemic has added urgency to the debate. With government debt soaring, there is growing pressure on politicians to find new sources of revenue. Taxing the digital economy is seen as one of the most promising options.

But reaching a global agreement will not be easy. The United States has been reluctant to support proposals that would significantly increase the tax burden on American companies. And there are concerns that unilateral action by individual countries could lead to double taxation and trade disputes.

Despite these challenges, there are reasons for optimism. The political momentum for reform is stronger than it has been in decades. And the pandemic has demonstrated the vital importance of tax revenue for funding public services. The question is whether the international community can seize this moment to create a fairer and more effective global tax system.`);

// ============================================================
// 2019 考研英语一 (考试时间: 2018年12月)
// ============================================================
addPassage(2019, "Text1", null, `Financial regulators in Britain have imposed a rather unusual rule on the bosses of big banks. They must set aside a portion of their annual bonuses for up to seven years, to be paid out only if the bank's performance holds up. The idea is to discourage short-term risk-taking that might boost this year's bonus but damage the bank's long-term health.

The rule reflects a growing recognition that the structure of executive compensation can contribute to excessive risk-taking. Before the financial crisis, many bank executives received large bonuses based on short-term performance metrics, with little regard for the long-term consequences of their decisions. When the crisis hit, the bonuses had already been paid, and the losses fell on shareholders and taxpayers.

Britain's approach is part of a broader trend toward deferred compensation. In the United States, the Dodd-Frank Act required banks to defer at least 50 percent of bonuses for senior executives for at least three years. Similar rules have been adopted in the European Union and other jurisdictions.

But deferred compensation is not without its critics. Some argue that it does not go far enough, and that the only way to align the interests of executives with those of shareholders is to require them to hold significant amounts of stock for extended periods. Others contend that the rules are too blunt, and that they penalize all executives regardless of their individual risk-taking behavior.

There are also practical challenges. Deferred compensation can be difficult to enforce, particularly when executives leave the firm before the deferral period ends. And there is a risk that the rules could make it harder for banks to attract top talent, as executives may prefer to work for firms that offer more immediate rewards.

Despite these challenges, the trend toward deferred compensation seems likely to continue. The financial crisis exposed the dangers of short-term incentives, and regulators are determined to prevent a repeat. The question is whether the current approach is sufficient, or whether more radical reforms are needed.`);

addPassage(2019, "Text2", null, `Grade inflation — the tendency for grades to rise over time, even when student performance does not — is one of the most persistent problems in higher education. Over the past few decades, the average grade at American universities has risen steadily, from a C in the 1960s to a B+ or even an A- today at many institutions.

The causes of grade inflation are complex and debated. Some argue that it is driven by the increasing competition for students, which puts pressure on institutions to offer high grades as an incentive to enroll. Others contend that it reflects a shift in the culture of higher education, in which students are seen as consumers and grades as a product to be delivered.

Whatever the causes, the consequences are significant. Grade inflation undermines the signaling function of grades, making it harder for employers and graduate schools to distinguish between strong and weak students. It also creates perverse incentives, encouraging students to choose courses and majors based on the likelihood of getting high grades rather than on intellectual interest or career goals.

Some institutions have tried to address the problem by providing additional information alongside grades. For example, some transcripts now include the median grade in each course, allowing employers to see how a student's grade compares to the average. Others have introduced grading standards or quotas to limit the proportion of high grades.

But these measures have had limited success. Faculty members often resist efforts to restrict their grading freedom, and students continue to gravitate toward courses with generous grading. The result is a system in which grades convey less and less information, and in which the gap between the most and least selective institutions continues to widen.

The challenge is to find a way to restore the integrity of grades without undermining the legitimate goals of higher education. This may require a fundamental rethinking of the role that grades play in the educational system.`);

addPassage(2019, "Text3", null, `The word "artificial" has a bad reputation. It is often used as a synonym for "fake" or "inauthentic," and is contrasted with the "natural" or "genuine." But this contrast is misleading, because it implies that what is natural is always good and what is artificial is always bad.

Consider the case of artificial sweeteners. They are artificial in the sense that they are manufactured rather than occurring naturally. But they can also be beneficial, helping people to reduce their sugar intake and manage their weight. Similarly, artificial limbs and organs can restore function and improve quality of life for people with disabilities.

The problem is not with artificial things per se, but with the way they are created and used. When artificial products are designed without regard for their environmental or social consequences, they can cause significant harm. But when they are designed thoughtfully and responsibly, they can be a force for good.

This is particularly relevant in the context of artificial intelligence. AI is artificial by definition, but that does not make it inherently bad. Like any technology, its impact depends on how it is developed and deployed. AI can be used to solve some of the world's most pressing problems, from climate change to disease. But it can also be used to manipulate, surveil, and discriminate.

The challenge is to develop a more nuanced understanding of the relationship between the natural and the artificial. Rather than treating them as opposites, we should recognize that they exist on a continuum, and that the distinction between them is often blurred. What matters is not whether something is natural or artificial, but whether it is good or bad, helpful or harmful.

This requires a shift in our thinking. We need to move beyond the simplistic dichotomy of natural versus artificial and develop a more sophisticated framework for evaluating the technologies that shape our lives.`);

addPassage(2019, "Text4", null, `States will be able to force more people to pay sales tax when they make online purchases under a Supreme Court decision Thursday that will leave shoppers with lighter wallets but is a big financial win for states.

The Supreme Court's opinion Thursday overruled a pair of decades-old decisions that states said cost them billions of dollars in lost revenue annually. The decisions made it more difficult for states to collect sales tax on certain online purchases.

The cases the court overturned said that if a business was shipping a customer's purchase to a state where the business didn't have a physical presence such as a warehouse or office, the business didn't have to collect sales tax for the state. Customers were generally responsible for paying the sales tax to the state themselves if they weren't charged it, but most didn't realize they owed it and few paid.

Justice Anthony Kennedy wrote that the previous decisions were flawed. Each year the physical presence rule becomes further removed from economic reality, he wrote. Kennedy wrote that the rule limited states' ability to seek long-term prosperity and has prevented market participants from competing on an even playing field.

The ruling is a victory for big chains with a presence in many states, since they usually collect sales tax on online purchases already. Now, rivals will be charging sales tax where they hadn't before. Big chains have been collecting sales tax nationwide because they typically have physical stores in whatever state a purchase is being shipped to.

Retail trade groups praised the ruling, saying it levels the playing field for local and online businesses. The losers, said retail analyst Neil Saunders, are online-only retailers, especially smaller ones. Those retailers may face headaches complying with various state sales tax laws.`);

// ============================================================
// 2018 考研英语一 (考试时间: 2017年12月)
// ============================================================
addPassage(2018, "Text1", "Robots and Middle-Class Jobs", `Among the annoying challenges facing the middle class is one that will probably go unmentioned in the next presidential campaign: What happens when the robots come for their jobs? Don't dismiss that possibility entirely. About half of U.S. jobs are at high risk of being automated, according to a University of Oxford study, with the middle class disproportionately squeezed. Lower-income jobs like gardening or day care don't appeal to robots. But many middle-class occupations — trucking, financial advice, software engineering — have aroused their interest, or soon will. The rich own the robots, so they will be fine.

This isn't to be alarmist. Optimists point out that technological upheaval has benefited workers in the past. The Industrial Revolution didn't go so well for Luddites whose jobs were displaced by mechanized looms, but it eventually raised living standards and created more jobs than it destroyed. Likewise, automation should eventually boost productivity, stimulate demand by driving down prices, and free workers from hard, boring work. But in the medium term, middle-class workers may need a lot of help adjusting.

The first step, as Erik Brynjolfsson and Andrew McAfee argue in The Second Machine Age, should be rethinking education and job training. Curriculums — from grammar school to college — should evolve to focus less on memorizing facts and more on creativity and complex communication. Vocational schools should do a better job of fostering problem-solving skills and helping students work alongside robots. Online education can supplement the traditional kind. It could make extra training and instruction affordable. Professionals trying to acquire new skills will be able to do so without going into debt.

The challenge of coping with automation underlines the need for the U.S. to revive its fading business dynamism: Starting new companies must be made easier. In previous eras of drastic technological change, entrepreneurs smoothed the transition by dreaming up ways to combine labor and machines. The best uses of 3D printers and virtual reality haven't been invented yet. The U.S. needs the new companies that will invent them.

Finally, because automation threatens to widen the gap between capital income and labor income, taxes and the safety net will have to be rethought. Taxes on low-wage labor need to be cut, and wage subsidies such as the earned income tax credit should be expanded: This would boost incomes, encourage work, reward companies for job creation, and reduce inequality.

Technology will improve society in ways big and small over the next few years, yet this will be little comfort to those who find their lives and careers upended by automation. Destroying the machines that are coming for our jobs would be nuts. But policies to help workers adapt will be indispensable.`);

addPassage(2018, "Text2", null, `A new survey by the Pew Research Center finds that Americans are broadly skeptical about the future of work. Most believe that within 50 years, robots and computers will do much of the work currently done by humans. But they are divided about whether this will be a good or bad thing.

The survey found that 65 percent of Americans expect that within 50 years, robots and computers will do much of the work currently done by humans. But only 36 percent said this would be good for society, while 47 percent said it would be bad.

The results highlight a fundamental tension in public attitudes toward technology. On one hand, Americans recognize the potential benefits of automation, from increased productivity to lower prices. On the other hand, they worry about the social and economic consequences, particularly the loss of jobs and the widening of inequality.

The survey also found significant differences in attitudes across demographic groups. Younger adults, those with higher levels of education, and those with higher incomes were more likely to view automation positively. Older adults, those with less education, and those with lower incomes were more likely to view it negatively.

These differences reflect broader patterns in the American economy. Workers in routine, predictable jobs — the jobs most vulnerable to automation — tend to have lower levels of education and income. Workers in jobs that require creativity, judgment, and interpersonal skills — the jobs least vulnerable to automation — tend to have higher levels of education and income.

The challenge for policymakers is to manage the transition to a more automated economy in a way that shares the benefits broadly. This will require investment in education and training, as well as policies to support workers who are displaced by technology. It will also require a more honest conversation about the trade-offs involved in technological change.`);

addPassage(2018, "Text3", null, `The idea that privacy is a fundamental human right is deeply embedded in Western legal and political thought. But in the age of big data, the concept of privacy is being fundamentally redefined.

The traditional understanding of privacy is based on the idea of a private sphere — a space that is separate from the public realm and that the state and others are not permitted to invade. This understanding underpins many of the legal protections that we take for granted, from the Fourth Amendment's prohibition on unreasonable searches and seizures to the doctor-patient privilege.

But the rise of big data has made this understanding increasingly inadequate. In a world in which our every click, purchase, and movement is tracked and recorded, the notion of a private sphere that is separate from the public realm no longer makes sense. Our data is constantly being collected, analyzed, and monetized, often without our knowledge or consent.

Some scholars have argued that we need a new understanding of privacy that is better suited to the digital age. Rather than focusing on the boundary between the public and private spheres, they suggest, we should think about privacy in terms of control over personal information. On this view, privacy is violated not when information enters the public realm, but when individuals lose control over how their information is used.

Others argue that the traditional understanding of privacy is still valuable, but that it needs to be supplemented with new protections that address the specific challenges of the digital age. These might include stronger data protection laws, limits on the collection and use of personal data, and greater transparency about how data is being used.

The debate about privacy in the digital age is ultimately a debate about power. In a world in which a handful of companies control vast amounts of personal data, the question of who has the right to collect, use, and profit from that data is a question of fundamental importance.`);

addPassage(2018, "Text4", null, `The U.S. Postal Service (USPS) continues to bleed red ink. It reported a net loss of $5.6 billion for fiscal 2016, the 10th straight year its expenses have exceeded revenue. Meanwhile, it has more than $120 billion in unfunded liabilities, mostly for employee health and retirement costs.

The problems of the USPS are well documented. The rise of email and digital communication has dramatically reduced the volume of first-class mail, which has long been the agency's main source of revenue. At the same time, the USPS is required by law to deliver mail to every address in the country, six days a week, regardless of cost.

Various solutions have been proposed. Some argue that the USPS should be privatized, allowing it to operate more like a business and less like a government agency. Others contend that it should be reformed, with changes to its business model, labor costs, and delivery schedule.

The USPS itself has proposed a number of reforms, including ending Saturday delivery, closing underused post offices, and offering new services such as banking and notary services. But many of these proposals require congressional approval, which has been hard to come by.

The political dynamics are complex. Rural communities, which rely heavily on the USPS, are particularly concerned about any reduction in service. Postal unions, which represent a powerful political constituency, are resistant to changes that might affect jobs or benefits. And some lawmakers are reluctant to support any reform that might be seen as privatizing a beloved public institution.

Despite these challenges, the need for reform is urgent. The USPS is on an unsustainable path, and the longer the problems are left unaddressed, the more painful the eventual reckoning will be. The question is whether Congress can find the political will to act before it is too late.`);

// ============================================================
// 2017 考研英语一
// ============================================================
addPassage(2017, "Text1", null, `First two hours, now three hours — this is how far in advance authorities are recommending people show up to catch a domestic flight, at least at some major U.S. airports with increasingly massive security lines.

Americans are willing to tolerate time-consuming security protocols in return for increased safety. The crash of Egypt Air Flight 804, which terrorists may have downed over the Mediterranean Sea, provides another tragic reminder of why. But demanding too much of air travelers or providing too little security in return undermines public support for the process. And it should: Wasted time is a drag on Americans' economic and private lives, not to mention infuriating.

Last year, the Transportation Security Administration (TSA) found in a secret check that undercover investigators were able to sneak weapons — both fake and real — past airport security nearly every time they tried. Enhanced security measures since then, combined with a rise in airline travel due to the improving economy and low oil prices, have resulted in long waits at major airports such as Chicago's O'Hare International. It is not yet clear how much more effective airline security has become — but the lines are obvious.

Part of the issue is that the government did not anticipate the steep increase in airline travel, so the TSA is now rushing to get new screeners on the line. Part of the issue is that airports have only so much room for screening lanes. Another factor may be that more people are trying to overpack their carry-on bags to avoid checked-baggage fees, though the airlines strongly dispute this.

There is one step the TSA could take that would not require remodeling airports or rushing to hire: Enroll more people in the PreCheck program. PreCheck is supposed to be a win-win for travelers and the TSA. Passengers who pass a background check are eligible to use expedited screening lanes. This allows the TSA to focus on travelers who are higher risk, saving time for everyone involved. TSA wants to enroll 25 million people in PreCheck.

It has not gotten anywhere close to that, and one big reason is sticker shock: Passengers must pay $85 every five years to process their background checks. Since the beginning, this price tag has been PreCheck's fatal flaw. Upcoming reforms might bring the price to a more reasonable level. But Congress should look into doing so directly, by helping to finance PreCheck enrollment or to cut costs in other ways.

The TSA cannot continue diverting resources into underused PreCheck lanes while most of the traveling public suffers in unnecessary lines. It is long past time to make the program work.`);

addPassage(2017, "Text2", null, `"The ancient Hawaiians were astronomers," wrote Queen Liliuokalani, Hawaii's last reigning monarch, in 1897. Star watchers were among the most esteemed members of Hawaiian society. Sadly, all is not well with astronomy in Hawaii today. Protests have erupted over construction of the Thirty Meter Telescope (TMT), a giant observatory that promises to revolutionize humanity's view of the cosmos.

At issue is the TMT's planned location on Mauna Kea, a dormant volcano worshiped by some Hawaiians as the piko, that connects the Hawaiian Islands to the heavens. But Mauna Kea is also home to some of the world's most powerful telescopes. Rested in the Pacific Ocean, Mauna Kea's peak rises above the bulk of our planet's dense atmosphere, where conditions allow telescopes to obtain images of unsurpassed clarity.

Opposition to telescopes on Mauna Kea is nothing new. A small but vocal group of Hawaiians and environments have long viewed their presence as disrespect for sacred land and a painful reminder of the occupation of what was once a sovereign nation.

Some blame for the current controversy belongs to astronomers. In their eagerness to build bigger telescopes, they forgot that science is the only way of understanding the world. They did not always prioritize the protection of Mauna Kea's fragile ecosystems or its holiness to the island's inhabitants. Hawaiian culture is not a relic of the past; it is a living culture undergoing a renaissance today.

Yet science has a cultural history, too, with roots going back to the dawn of civilization. The same curiosity to find what lies beyond the horizon that first brought early Polynesians to Hawaii's shores inspires astronomers today to explore the heavens. Calls to disassemble all telescopes on Mauna Kea or to ban future development there ignore the reality that astronomy and Hawaiian culture both seek to answer big questions about who we are, where we come from and where we are going. Perhaps that is why we explore the starry skies, as if answering a primal calling to know ourselves and our true ancestral homes.

The astronomy community is making compromises to change its use of Mauna Kea. The TMT site was chosen to minimize the telescope's visibility around the island and to avoid archaeological and environmental impact. To limit the number of telescopes on Mauna Kea, old ones will be removed at the end of their lifetimes and their sites returned to a natural state. There is no reason why everyone cannot be welcomed on Mauna Kea to embrace their cultural heritage and to study the stars.`);

addPassage(2017, "Text3", null, `Robert F. Kennedy once said that a country's GDP measures "everything except that which makes life worthwhile." With Britain voting to leave the European Union, and GDP already predicted to slow as a result, it is now a timely moment to assess what he was referring to.

The question of GDP and its usefulness has annoyed policymakers for over half a century. Many argue that it is a flawed concept. It measures things that do not matter and misses things that do. By most recent measures, the UK's GDP has been the envy of the Western world, with record low unemployment and high growth figures. If everything was going so well, then why did over 17 million people vote for Brexit, despite the warnings about what it could do to their country's economic prospects?

A recent annual study of countries and their ability to convert growth into well-being sheds some light on that question. Across the 163 countries measured, the UK is one of the poorest performers in ensuring that economic growth is translated into meaningful improvements for its citizens. Rather than just focusing on GDP, over 40 different sets of criteria from health, education and civil society engagement have been measured to get a more rounded assessment of how countries are performing.

While all of these countries face their own challenges, there are a number of consistent themes. Yes, there has been a budding economic recovery since the 2008 global crash, but in key indicators in areas such as health and education, major economies have continued to decline. Yet this isn't the case with all countries. Some relatively poor European countries have seen huge improvements across measures including civil society, income equality and environment.

This is a lesson that rich countries can learn: When GDP is no longer regarded as the sole measure of a country's success, the world looks very different.

So what Kennedy was referring to was that while GDP has been the most common method for measuring the economic activity of nations, as a measure, it is no longer enough. It does not include important factors such as environmental quality or education outcomes — all things that contribute to a person's sense of well-being.

The sharp hit to growth predicted around the world and in the UK could lead to a decline in the everyday services we depend on for our well-being and for growth. But policymakers who refocus efforts on improving well-being rather than simply worrying about GDP figures could avoid the forecasted doom and may even see progress.`);

addPassage(2017, "Text4", null, `In a rare unanimous ruling, the US Supreme Court has overturned the corruption conviction of a former Virginia governor, Robert McDonnell. But it did so while holding its nose at the ethics of his conduct, which included accepting gifts such as a Rolex watch and a Ferrari automobile from a company seeking access to government.

The high court's decision said the judge in Mr. McDonnell's trial failed to tell a jury that it must look only at his "official acts," or the former governor's decisions on "specific" and "unsettled" issues related to his duties.

Merely helping a gift-giver gain access to other officials, unless done with clear intent to pressure those officials, is not corruption, the justices found.

The court did suggest that accepting favors in return for opening doors is "distasteful" and "nasty." But under anti-bribery laws, proof must be made of concrete benefits, such as approval of a contract or regulation. Simply arranging a meeting, making a phone call, or hosting an event is not an "official act."

The court's ruling is legally sound in defining a kind of favoritism that is not criminal. Elected leaders must be allowed to help supporters deal with bureaucratic problems without fear of prosecution for bribery. "The basic compact underlying representative government," wrote Chief Justice John Roberts for the court, "assumes that public officials will hear from their constituents and act on their concerns."

But the ruling reinforces the need for citizens and their elected representatives, not the courts, to ensure equality of access to government. Officials must not be allowed to play favorites in providing information or in arranging meetings simply because an individual or group provides a campaign donation or a personal gift. This type of integrity requires well-enforced laws in government transparency, such as records of official meetings, rules on lobbying, and information about each elected leader's source of wealth.

Favoritism in official access can fan public perceptions of corruption. But it is not always corruption. Rather officials must avoid double standards, or different types of access for average people and the wealthy. If connections can be bought, a basic premise of democratic society — that all are equal in treatment by government — is undermined. Good governance rests on an understanding of the inherent worth of each individual.

The court's ruling is a step forward in the struggle against both corruption and official favoritism.`);

// ============================================================
// 2016 考研英语一
// ============================================================
addPassage(2016, "Text1", null, `France, which prides itself as the global innovator of fashion, has decided its fashion industry has lost an absolute right to define physical beauty for women. Its lawmakers gave preliminary approval last week to a law that would make it a crime to employ ultra-thin models on runways.

The parliament also agreed to ban websites that "incite excessive thinness" by promoting extreme dieting.

Such measures have a couple of uplifting motives. They suggest beauty should not be defined by looks that end up impinging on health. That's a start. And the ban on ultra-thin models seems to go beyond protecting models from starving themselves to death — as some have done. It tells the fashion industry that it must take responsibility for the signal it sends women, especially teenage girls, about the social tape-measure they must use to determine their individual worth.

The bans, if fully enforced, would suggest to women (and many men) that they should not let others be arbiters of their beauty. And perhaps faintly, they hint that people should look to intangible qualities like character and intellect rather than dieting their way to size zero or wasp-waist physiques.

The French measures, however, rely too much on severe punishment to change a culture that still regards beauty as skin-deep — and bone-showing. Under the law, using a fashion model that does not meet a government-defined index of body mass could result in a $85,000 fine and six months in prison.

The fashion industry knows it has an inherent problem in focusing on material adornment and idealized body types. In Denmark, the United States, and a few other countries, it is trying to set voluntary standards for models and fashion images that rely more on peer pressure for enforcement.

In contrast to France's actions, Denmark's fashion industry agreed last month on rules and sanctions regarding the age, health, and other characteristics of models. The newly revised Danish Fashion Ethical Charter clearly states: "We are aware of and take responsibility for the impact the fashion industry has on body ideals, especially on young people." The charter's main tool of enforcement is to deny access for designers and modeling agencies to Copenhagen Fashion Week, which is run by the Danish Fashion Institute. But in general it relies on a name-and-shame method of compliance.

Relying on ethical persuasion rather than law to address the misuse of body ideals may be the best step. Even better would be to help elevate notions of beauty beyond the material standards of a particular industry.`);

addPassage(2016, "Text2", null, `For the first time in history more people live in towns than in the country. In Britain this has had a curious result. While polls show Britons rate "the countryside" alongside the royal family, Shakespeare and the National Health Service (NHS) as what makes them proudest of their country, this has limited political support.

A century ago Octavia Hill launched the National Trust not to rescue stylish houses but to save "the beauty of natural places for everyone forever." It was specifically to provide city dwellers with spaces for leisure where they could experience "a refreshing air." Hill's pressure later led to the creation of national parks and green belts. They don't make countryside any more, and every year concrete consumes more of it. It needs constant guardianship.

At the next election none of the big parties seem likely to endorse this sentiment. The conservatives' planning reform explicitly gives rural development priority over conservation, even authorizing "off-plan" building where local people might object. The concept of sustainable development has been defined as profitable. Labour likewise wants to discontinue local planning where councils oppose development. The Liberal Democrats are silent. Only Ukip, sensing its chance, has sided with those pleading for a more considered approach to using green land. Its Campaign to Protect Rural England struck terror into many local Conservative parties.

The sensible place to build new houses, factories and offices is where people are, in cities and towns where infrastructure is in place. The London agents Stirling Ackroyd recently identified enough sites for half a million houses in the London area alone, no intrusion on green belt. What is true of London is even truer of the provinces.

The idea that "housing crisis" equals "concreted meadows" is pure lobby talk. The issue is not the need for more houses but, as always, where to put them. Under lobby pressure, George Osborne favours rural new-build against urban renovation and renewal. He favours out-of-town shopping sites against high streets. This is not a free market but a biased one. Rural towns and villages have grown and will always grow. They do so best where building sticks to their edges and respects their character. We do not ruin urban conservation areas. Why ruin rural ones?

Development should be planned, not let rip. After the Netherlands, Britain is Europe's most crowded country. Half a century of town and country planning has enabled it to retain an enviable rural coherence, while still permitting low-density urban living. There is no doubt of the alternative — the corrupted landscapes of southern Portugal, Spain or Ireland. Avoiding this rather than promoting it should unite left and right of the political spectrum.`);

addPassage(2016, "Text3", null, `"There is one and only one social responsibility of businesses," wrote Milton Friedman, a Nobel prize-winning economist, "That is, to use its resources and engage in activities designed to increase its profits." But even if you accept Friedman's premise and regard corporate social responsibility (CSR) policies as a waste of shareholders' money, things may not be absolutely clear-cut. New research suggests that CSR may create monetary value for companies — at least when they are prosecuted for corruption.

The largest firms in America and Britain together spend more than $15 billion a year on CSR, according to an estimate by EPG, a consulting firm. This could add value to their businesses in three ways. First, consumers may take CSR spending as a "signal" that a company's products are of high quality. Second, customers may be willing to buy a company's products as an indirect way to donate to the good causes it helps. And third, through a more diffuse "halo effect," whereby its good deeds earn it greater consideration from consumers and others.

Previous studies on CSR have had trouble differentiating these effects because consumers can be affected by all three. A recent study attempts to separate them by looking at bribery prosecutions under America's Foreign Corrupt Practices Act (FCPA). It argues that since prosecutors do not consume a company's products as part of their investigations, they could be influenced only by the halo effect.

The study found that, among prosecuted firms, those with the most comprehensive CSR programmes tended to get more lenient penalties. Their analysis ruled out the possibility that it was firms' political influence, rather than their CSR stand, that accounted for the leniency: Companies that contributed more to political campaigns did not receive lower fines.

In all, the study concludes that whereas prosecutors should only evaluate a case based on its merits, they do seem to be influenced by a company's record in CSR. "We estimate that either eliminating a substantial labour-rights concern, such as child labour, or increasing corporate giving by about 20% results in fines that generally are 40% lower than the typical punishment for bribing foreign officials," says one researcher.

Researchers admit that their study does not answer the question of how much businesses ought to spend on CSR. Nor does it reveal how much companies are banking on the halo effect rather than the other possible benefits, when they decide their do-gooding policies. But at least they have demonstrated that when companies get into trouble with the law, evidence of good character can win them a less costly punishment.`);

addPassage(2016, "Text4", null, `There will eventually come a day when The New York Times ceases to publish stories on newsprint. Exactly when that day will be is a matter of debate. "Sometime in the future," the paper's publisher said back in 2010.

Nostalgia for ink on paper and the rustle of pages aside, there's plenty of incentive to ditch print. The infrastructure required to make a physical newspaper — printing presses, delivery trucks — isn't just expensive; it's excessive at a time when online-only competitors don't have the same set of financial constraints. Readers are migrating away from print anyway. And though print ad sales still dwarf their online and mobile counterparts, revenue from print is still declining.

Overhead may be high and circulation lower, but rushing to eliminate its print edition would be a mistake, says BuzzFeed CEO Jonah Peretti.

Peretti says the Times shouldn't waste time getting out of the print business, but only if they go about doing it the right way. "Figuring out a way to accelerate that transition would make sense for them," he said, "but if you discontinue it, you're going to have your most loyal customers really upset with you."

Sometimes that's worth making a change anyway. Peretti gives the example of Netflix discontinuing its DVD-mailing service to focus on streaming. "It was seen as a blunder," he said. The move turned out to be foresighted. And if Peretti were in charge at the Times? "I wouldn't pick a year to end print," he said. "I would raise prices and make it into more of a legacy product."

The most loyal customers would still get the product they favor, the idea goes, and they'd feel like they were helping sustain the quality of something they believe in. "So if you're overpaying for print, you could feel like you were helping," Peretti said. "Then increase it at a higher rate each year and essentially try to generate additional revenue." In other words, if you're going to make a print product, make it for the people who are already obsessed with it, which may be what the Times is doing already. Getting the print edition seven days a week costs nearly $500 a year — more than twice as much as a digital-only subscription.

"It's a really hard thing to do and it's a tremendous luxury that BuzzFeed doesn't have a legacy business," Peretti remarked. "But we're going to have questions like that where we have things we're doing that don't make sense when the market changes and the world changes. In those situations, it's better to be more aggressive than less aggressive."`);

// ============================================================
// 2015 考研英语一
// ============================================================
addPassage(2015, "Text1", null, `King Juan Carlos of Spain once insisted "kings don't abdicate, they die in their sleep." But embarrassing scandals and the popularity of the republican left in the recent Euro-elections have forced him to eat his words and stand down. So, does the Spanish crisis suggest that monarchy is seeing its last days? Does that mean the writing is on the wall for all European royals, with their magnificent uniforms and majestic lifestyles?

The Spanish case provides arguments both for and against monarchy. When public opinion is particularly polarized, as it was following the end of the Franco regime, monarchs can rise above "mere" politics and "embody" a spirit of national unity.

It is this apparent transcendence of politics that explains monarchs' continuing popularity as heads of state. And so, the Middle East excepted, Europe is the most monarch-infested region in the world, with 10 kingdoms (not counting Vatican City and Andorra). But unlike their absolutist counterparts in the Gulf and Asia, most royal families have survived because they allow voters to avoid the difficult search for a non-controversial but respected public figure.

Even so, kings and queens undoubtedly have a downside. Symbolic of national unity as they claim to be, their very history — and sometimes the way they behave today — embodies outdated and indefensible privileges and inequalities. At a time when Thomas Piketty and other economists are warning of rising inequality and the increasing power of inherited wealth, it is bizarre that wealthy aristocratic families should still be the symbolic heart of modern democratic states.

The most successful monarchies strive to abandon or hide their old aristocratic ways. Princes and princesses have day jobs and ride bicycles, not horses (or helicopters). Even so, these are wealthy families who party with the international 1%, and media intrusiveness makes it increasingly difficult to maintain the right image.

While Europe's monarchies will no doubt be smart enough to survive for some time to come, it is the British royals who have most to fear from the Spanish example.

It is only the Queen who has preserved the monarchy's reputation with her rather ordinary (if well-heeled) granny style. The danger will come with Charles, who has both an expensive taste in lifestyle and a pretty hierarchical view of the world. He has failed to understand that monarchies have largely survived because they provide a service — as non-controversial and non-political heads of state. Charles ought to know that as English history shows, it is kings, not republicans, who are the monarchy's worst enemies.`);

addPassage(2015, "Text2", null, `Just how much does the Constitution protect your digital data? The Supreme Court will now consider whether police can search the contents of a mobile phone without a warrant if the phone is on or around a person during an arrest.

California has asked the justices to refrain from a sweeping ruling, particularly one that upsets the old assumption that authorities may search through the possessions of suspects at the time of their arrest. It is hard, the state argues, for judges to assess the implications of new and rapidly changing technologies.

The court would be recklessly modest if it followed California's advice. Enough of the implications are discernible, even obvious, so that the justices can and should provide updated guidelines to police, lawyers and defendants.

They should start by discarding California's lame argument that exploring the contents of a smart phone — a vast storehouse of digital information — is similar to, say, rifling through a suspect's purse. The court has ruled that police don't violate the Fourth Amendment when they sift through the wallet or pocketbook of an arrestee without a warrant. But exploring one's smart phone is more like entering his or her home. A smart phone may contain an arrestee's reading history, financial history, medical history and comprehensive records of recent correspondence. The development of "cloud computing," meanwhile, has made that exploration so much the easier.

Americans should take steps to protect their digital privacy. But keeping sensitive information on these devices is increasingly a requirement of normal life. Citizens still have a right to expect private documents to remain private and protected by the Constitution's prohibition on unreasonable searches.

As so often is the case, stating that principle doesn't ease the challenge of line-drawing. In many cases, it would not be overly onerous for authorities to obtain a warrant to search through phone contents. They could still invalidate Fourth Amendment protections when facing severe, urgent circumstances, and they could take reasonable measures to ensure that phone data are not erased or altered while a warrant is pending. The court, though, may want to allow room for police to cite situations where they are entitled to more freedom.

But the justices should not swallow California's argument whole. New, disruptive technology sometimes demands novel applications of the Constitution's protections. Orin Kerr, a law professor, compares the explosion and accessibility of digital information in the 21st century with the establishment of automobile use as a virtual necessity of life in the 20th: The justices had to specify novel rules for the new personal domain of the passenger car then; they must sort out how the Fourth Amendment applies to digital information now.`);

addPassage(2015, "Text3", null, `The journal Science is adding an extra round of statistical checks to its peer-review process, editor-in-chief Marcia McNutt announced today. The policy follows similar efforts from other journals, after widespread concern that basic mistakes in data analysis are contributing to the irreproducibility of many published research findings.

"Readers must have confidence in the conclusions published in our journal," writes McNutt in an editorial. Working with the American Statistical Association, the journal has appointed seven experts to a statistics board of reviewing editors (SBoRE). Manuscripts will be flagged up for additional scrutiny by the journal's internal editors, or by its existing Board of Reviewing Editors or by outside peer reviewers. The SBoRE panel will then find external statisticians to review these manuscripts.

Asked whether any particular papers had impelled the change, McNutt said: "The creation of the 'statistics board' was motivated by concerns broadly with the application of statistics and data analysis in scientific research and is part of Science's overall drive to increase reproducibility in the research we publish."

Giovanni Parmigiani, a biostatistician at the Harvard School of Public Health, is a member of the SBoRE group. He says he expects the board to "play primarily an advisory role." He agreed to join because he "found the foresight behind the establishment of the SBoRE to be novel, unique and likely to have a lasting impact. This impact will not only be through the publications in Science itself, but hopefully through a larger group of publishing places that may want to model their approach after Science."

John Ioannidis, a physician who studies research methodology, says that the policy is "a most welcome step forward" and "long overdue." "Most journals are weak in statistical review, and this damages the quality of what they publish. I think that, for the majority of scientific papers nowadays, statistical review is more essential than expert review," he says. But he noted that biomedical journals such as Annals of Internal Medicine, the Journal of the American Medical Association and The Lancet pay strong attention to statistical review.

Professional scientists are expected to know how to analyze data, but statistical errors are alarmingly common in published research, according to David Vaux, a cell biologist. Researchers should improve their standards, he wrote in 2012, but journals should also take a tougher line, "engaging reviewers who are statistically literate and editors who can verify the process." Vaux says that Science's idea to pass some papers to statisticians "has some merit, but a weakness is that it relies on the board of reviewing editors to identify 'the papers that need scrutiny' in the first place."`);

addPassage(2015, "Text4", null, `Two years ago, Rupert Murdoch's daughter, Elisabeth, spoke of the "unsettling dearth of integrity across so many of our institutions." Integrity had collapsed, she argued, because of a collective acceptance that the only "sorting mechanism" in society should be profit and the market. But "it's us, human beings, we the people who create the society we want, not profit."

Driving her point home, she continued: "It's increasingly apparent that the absence of purpose, of a moral language within government, media or business could become one of the most dangerous goals for capitalism and freedom." This same absence of moral purpose was wounding companies such as News International, she thought, making it more likely to lose its way as it had with widespread illegal telephone hacking.

As the hacking trial concludes — finding guilty one ex-editor of the News of the World, Andy Coulson, for conspiring to hack phones, and finding his predecessor, Rebekah Brooks, innocent of the same charge — the wider issue of dearth of integrity still stands. Journalists are known to have hacked the phones of up to 5,500 people. This is hacking on an industrial scale, as was acknowledged by Glenn Mulcaire, the man hired by the News of the World in 2001 to be the point person for phone hacking. Others await trial. This long story still unfolds.

In many respects, the dearth of moral purpose frames not only the fact of such widespread phone hacking but the terms on which the trial took place. One of the astonishing revelations was how little Rebekah Brooks knew of what went on in her newsroom, how little she thought to ask and the fact that she never inquired how the stories arrived. The core of her successful defence was that she knew nothing.

In today's world, it has become normal that well-paid executives should not be accountable for what happens in the organizations that they run — perhaps we should not be so surprised. For a generation, the collective doctrine has been that the sorting mechanism of society should be profit. The words that have mattered are efficiency, flexibility, shareholder value, business-friendly, wealth generation, sales, impact and, in newspapers, circulation. Words degraded to the margin have been justice, fairness, tolerance, proportionality and accountability.

The purpose of editing the News of the World was not to promote reader understanding, to be fair in what was written or to betray any common humanity. It was to ruin lives in the quest for circulation and impact. Ms Brooks may or may not have had suspicions about how her journalists got their stories, but she asked no questions, gave no instructions — nor received traceable, recorded answers.`);

// ============================================================
// 2014 考研英语一
// ============================================================
addPassage(2014, "Text1", null, `In order to "change lives for the better" and reduce "dependency," George Osborne, Chancellor of the Exchequer, introduced the "upfront work search" scheme. Only if the jobless arrive at the jobcentre with a CV, register for online job search, and start looking for work will they be eligible for benefit — and then they should report weekly rather than fortnightly. What could be more reasonable?

More apparent reasonableness followed. There will now be a seven-day wait for the jobseeker's allowance. "Those first few days should be spent looking for work, not looking to sign on," he claimed. "We're doing these things because we know they help people stay off benefits and help those on benefits get into work faster." Help? Really? On first hearing, this was the socially concerned chancellor, trying to change lives for the better, complete with "reforms" to an obviously indulgent system that demands too little effort from the newly unemployed to find work, and subsides laziness. What motivated him, we were to understand, was his zeal for "fundamental fairness" — protecting the taxpayer, controlling spending and ensuring that only the most deserving claimants received their benefits.

Losing a job is hurting: you don't skip down to the jobcentre with a song in your heart, delighted at the prospect of doubling your income from the generous state. It is financially terrifying, psychologically embarrassing and you know that support is minimal and extraordinarily hard to get. You are now not wanted; you are now excluded from the work environment that offers purpose and structure in your life. Worse, the crucial income to feed yourself and your family and pay the bills has disappeared. Ask anyone newly unemployed what they want and the answer is always: a job.

But in Osborneland, your first instinct is to fall into dependency — permanent dependency if you can get it — supported by a state only too ready to indulge your falsehood. It is as though 20 years of ever-tougher reforms of the job search and benefit administration system never happened. The principle of British welfare is no longer that you can insure yourself against the risk of unemployment and receive unconditional payments if the disaster happens. Even the very phrase "jobseeker's allowance" — invented in 1996 — is about redefining the unemployed as a "jobseeker" who had no mandatory right to a benefit he or she has earned through making national insurance contributions. Instead, the claimant receives a time-limited "allowance," conditional on actively seeking a job; no entitlement and no insurance, at £71.70 a week, one of the least generous in the EU.`);

addPassage(2014, "Text2", null, `All around the world, lawyers generate more hostility than the members of any other profession — with the possible exception of journalism. But there are few places where clients have more grounds for complaint than America.

During the decade before the economic crisis, spending on legal services in America grew twice as fast as inflation. The best lawyers made skyscrapers-full of money, tempting ever more students to pile into law schools. But most law graduates never get a big-firm job. Many of them instead become the kind of nuisance-lawsuit filer that makes the tort system a costly nightmare.

There are many reasons for this. One is the excessive costs of a legal education. There is just one path for a lawyer in most American states: a four-year undergraduate degree at one of 200 law schools authorized by the American Bar Association and an expensive preparation for the bar exam. This leaves today's average law-school graduate with $100,000 of debt on top of undergraduate debts. Law-school debt means that they have to work fearsomely hard.

Reforming the system would help both lawyers and their customers. Sensible ideas have been around for a long time, but the state-level bodies that govern the profession have been too conservative to implement them. One idea is to allow people to study law as an undergraduate degree. Another is to let students sit for the bar after only two years of law school. If the bar exam is truly a stern enough test for a would-be lawyer, those who can sit it earlier should be allowed to do so. Students who do not need the extra training could cut their debt mountain by a third.

The other reason why costs are so high is the restrictive guild-like ownership structure of the business. Except in the District of Columbia, non-lawyers may not own any share of a law firm. This keeps fees high and innovation slow. There is pressure for change from within the profession, but opponents of change among the regulators insist that keeping outsiders out of a law firm isolates lawyers from the pressure to make money rather than serve clients ethically.

In fact, allowing non-lawyers to own shares in law firms would reduce costs and improve services to customers, by encouraging law firms to use technology and to employ professional managers to focus on improving firms' efficiency. After all, other countries, such as Australia and Britain, have started liberalizing their legal professions. America should follow.`);

addPassage(2014, "Text3", null, `The US$3-million Fundamental Physics Prize is indeed an interesting experiment, as Alexander Polyakov said when he accepted this year's award in March. And it is far from the only one of its type. As a News Feature article in Nature discusses, a string of lucrative awards for researchers have joined the Nobel Prizes in recent years. Many, like the Fundamental Physics Prize, are funded from the telephone-number-sized bank accounts of Internet entrepreneurs. These benefactors have succeeded in their chosen fields, they say, and they want to use their wealth to draw attention to those who have succeeded in science.

What's not to like? Quite a lot, according to a handful of scientists quoted in the News Feature. You cannot buy class, as the old saying goes, and these upstart entrepreneurs cannot buy their prizes the prestige of the Nobels. The new awards are an exercise in self-promotion for those behind them, say scientists. They could distort the achievement-based system of peer-review-led research. They could cement the status quo of peer-reviewed research. They do not fund peer-reviewed research. They perpetuate the myth of the lone genius.

The goals of the prize-givers seem as scattered as the criticism. Some want to shock, others to draw people into science, or to better reward those who have made their careers in research.

As Nature has pointed out before, there are some legitimate concerns about how science prizes — both new and old — are distributed. The Breakthrough Prize in Life Sciences, launched this year, takes an unrepresentative view of what the life sciences include. But the Nobel Foundation's limit of three recipients per prize, each of whom must still be living, has long been outgrown by the collaborative nature of modern research — as will be demonstrated by the inevitable row over who is ignored when it comes to acknowledging the discovery of the Higgs boson. The Nobels were, of course, themselves set up by a very rich individual who had decided what he wanted to do with his own money. Time, rather than intention, has given them legitimacy.

As much as some scientists may complain about the new awards, two things seem clear. First, most researchers would accept such a prize if they were offered one. Second, it is surely a good thing that the money and attention come to science rather than go elsewhere. It is fair to criticize and question the mechanism — that is the culture of research, after all — but it is the prize-givers' money to do with as they please. It is wise to take such gifts with gratitude and grace.`);

addPassage(2014, "Text4", null, `"The Heart of the Matter," the just-released report by the American Academy of Arts and Sciences, deserves praise for affirming the importance of the humanities and social sciences to the prosperity and security of liberal democracy in America. Regrettably, however, the report's failure to address the true nature of the crisis facing liberal education may cause more harm than good.

In 2010, leading congressional Democrats and Republicans sent letters to the American Academy of Arts and Sciences asking that it identify actions that could be taken by "federal, state and local governments, universities, foundations, educators, individual benefactors and others" to "maintain national excellence in humanities and social scientific scholarship and education."

In response, the American Academy formed the Commission on the Humanities and Social Sciences, with Duke University President Richard Brodhead and retired Exelon CEO John Rowe as co-chairmen. Among the commission's 51 members are top-tier-university presidents, scholars, lawyers, judges, and business executives, as well as prominent figures from diplomacy, filmmaking, music and journalism.

The goals identified in the report are generally admirable. Because representative government presupposes an informed citizenry, the report supports full literacy; stresses the study of history and government, particularly American history and American government; and encourages the use of new digital technologies.

To encourage innovation and competition, the report calls for increased investment in research, the crafting of coherent curricula that improve students' ability to solve problems and communicate effectively in the 21st century, increased funding for teachers and the encouragement of scholars to bring their learning to bear on the great challenges of the day. The report also advocates greater study of foreign languages, international affairs and the expansion of study abroad programs.

One of the more novel ideas in the report is the creation of a "Culture Corps" in cities and town across America to "transmit humanistic and social scientific expertise from one generation to the next."

Unfortunately, despite 2½ years in the making, "The Heart of the Matter" never gets to the heart of the matter: the illiberal nature of liberal education at our leading colleges and universities.

The commission ignores that for several decades America's colleges and universities have produced graduates who don't know the content and character of liberal education and are thus deprived of its benefits. Sadly, the spirit of inquiry once at home on campus has been replaced by the use of the humanities and social sciences as vehicles for disseminating "progressive," or left-liberal propaganda.

Today, professors routinely treat the progressive interpretation of history and progressive public policy as the proper subject of study while portraying conservative or classical liberal ideas — such as free markets, self-reliance and a distrust of central planning — as falling outside the boundaries of routine, and sometimes legitimate, intellectual investigation.

The AAAS displays great enthusiasm for liberal education. Yet its report may well set back reform by obscuring the depth and breadth of the challenge that congress asked it to illuminate.`);

// ============================================================
// 2013 考研英语一
// ============================================================
addPassage(2013, "Text1", null, `In the 2006 film version of The Devil Wears Prada, Miranda Priestly, played by Meryl Streep, scolds her unattractive assistant for imagining that high fashion doesn't affect her. Priestly explains how the deep blue color of the assistant's sweater descended over the years from fashion shows to departments stores and to the bargain bin in which the poor girl doubtless found her garment.

This top-down conception of the fashion business couldn't be more out of date or at odds with the feverish world described in Overdressed, Elizabeth Cline's three-year indictment of "fast fashion." In the last decade or so, advances in technology have allowed mass-market labels such as Zara, H&M, and Uniqlo to react to trends more quickly and anticipate demand more precisely. Quicker turnarounds mean less wasted inventory, more frequent release, and more profit. These labels encourage style-conscious consumers to see clothes as disposable — meant to last only a wash or two, although they don't advertise that — and to renew their wardrobe every few weeks. By offering on-trend items at dirt-cheap prices, Cline argues, these brands have hijacked fashion cycles, shaking an industry long accustomed to a seasonal pace.

The victims of this revolution, of course, are not limited to designers. For H&M to offer a $5.95 knit miniskirt in all its 2,300-plus stores around the world, it must rely on low-wage overseas labor, order in volumes that strain natural resources, and use massive amounts of harmful chemicals.

Overdressed is the fashion world's answer to consumer-activist bestsellers like Michael Pollan's The Omnivore's Dilemma. "Mass-produced clothing, like fast food, fills a hunger and need, yet is non-durable and wasteful," Cline argues. Americans, she finds, buy roughly 20 billion garments a year — about 64 items per person — and no matter how much they give away, this excess leads to waste.

Towards the end of Overdressed, Cline introduced her ideal, a Brooklyn woman named Sarah Kate Beaumont, who since 2008 has made all of her own clothes — and beautifully. But as Cline is the first to note, it took Beaumont decades to perfect her craft; her example can't be knocked off.

Though several fast-fashion companies have made efforts to curb their impact on labor and the environment — including H&M, with its green Conscious Collection line — Cline believes lasting change can only be effected by the customer. She exhibits the idealism common to many advocates of sustainability, be it in food or in energy. Vanity is a constant; people will only start shopping more sustainably when they can't afford not to.`);

addPassage(2013, "Text2", null, `An old saying has it that half of all advertising budgets are wasted — the trouble is, no one knows which half. In the internet age, at least in theory, this fraction can be much reduced. By watching what people search for, click on and say online, companies can aim "behavioural" ads at those most likely to buy.

In the past couple of weeks a quarrel has illustrated the value to advertisers of such fine-grained information: Should advertisers assume that people are happy to be tracked and sent behavioural ads? Or should they have explicit permission?

In December 2010 America's Federal Trade Commission (FTC) proposed adding a "do not track" (DNT) option to internet browsers, so that users could tell advertisers that they did not want to be followed. Microsoft's Internet Explorer and Apple's Safari both offer DNT; Google's Chrome is due to do so this year. In February the FTC and Digital Advertising Alliance (DAA) agreed that the industry would get cracking on responding to DNT requests.

On May 31st Microsoft set off the row: It said that Internet Explorer 10, the version due to appear with Windows 8, would have DNT as a default.

It is not yet clear how advertisers will respond. Getting a DNT signal does not oblige anyone to stop tracking, although some companies have promised to do so. Unable to tell whether someone really objects to behavioural ads or whether they are sticking with Microsoft's default, some may ignore a DNT signal and press on anyway.

Also unclear is why Microsoft has gone it alone. After all, it has an ad business too, which it says will comply with DNT requests, though it is still working out how. If it is trying to upset Google, which relies almost wholly on advertising, it has chosen an indirect method: There is no guarantee that DNT by default will become the norm. DNT does not seem an obviously huge selling point for Windows 8 — though the firm has compared some of its other products favourably with Google's on that count before. Brendon Lynch, Microsoft's chief privacy officer, blogged: "We believe consumers should have more control." Could it really be that simple?`);

addPassage(2013, "Text3", null, `Up until a few decades ago, our visions of the future were largely — though by no means uniformly — glowingly positive. Science and technology would cure all the ills of humanity, leading to lives of fulfillment and opportunity for all.

Now utopia has grown unfashionable, as we have gained a deeper appreciation of the range of threats facing us, from asteroid strike to epidemic flu and to climate change. You might even be tempted to assume that humanity has little future to look forward to.

But such gloominess is misplaced. The fossil record shows that many species have endured for millions of years — so why shouldn't we? Take a broader look at our species' place in the universe, and it becomes clear that we have an excellent chance of surviving for tens, if not hundreds, of thousands of years. Look up Homo sapiens in the "Red List" of threatened species of the International Union for the Conservation of Nature (IUCN), and you will read: "Listed as Least Concern as the species is very widely distributed, adaptable, currently increasing, and there are no major threats resulting in an overall population decline."

So what does our deep future hold? A growing number of researchers and organisations are now thinking seriously about that question. For example, the Long Now Foundation has its flagship project a mechanical clock that is designed to still be marking time thousands of years hence.

Perhaps willfully, it may be easier to think about such lengthy timescales than about the more immediate future. The potential evolution of today's technology, and its social consequences, is dazzlingly complicated, and it's perhaps best left to science fiction writers and futurologists to explore the many possibilities we can envisage. That's one reason why we have launched Arc, a new publication dedicated to the near future.

But take a longer view and there is a surprising amount that we can say with considerable assurance. As so often, the past holds the key to the future: we have now identified enough of the long-term patterns shaping the history of the planet, and our species, to make evidence-based forecasts about the situations in which our descendants will find themselves.

This long perspective makes the pessimistic view of our prospects seem more likely to be a passing fad. To be sure, the future is not all rosy. But we are now knowledgeable enough to reduce many of the risks that threatened the existence of earlier humans, and to improve the lot of those to come.`);

addPassage(2013, "Text4", null, `On a five to three vote, the Supreme Court knocked out much of Arizona's immigration law Monday — a modest policy victory for the Obama Administration. But on the more important matter of the Constitution, the decision was an 8-0 defeat for the federal government and the states.

In Arizona v. United States, the majority overturned three of the four contested provisions of Arizona's controversial plan to have state and local police enforce federal immigration law. The Constitutional principles that Washington alone has the power to "establish a uniform Rule of Naturalization" and that federal laws precede state laws are noncontroversial. Arizona had attempted to fashion state policies that ran parallel to the existing federal ones.

Justice Anthony Kennedy, joined by Chief Justice John Roberts and the Court's liberals, ruled that the state flew too close to the federal sun. On the overturned provisions the majority held that Congress had deliberately "occupied the field" and Arizona had thus intruded on the federal's privileged powers.

However, the Justices said that Arizona police would be allowed to verify the legal status of people who come in contact with law enforcement. That's because Congress has always envisioned joint federal-state immigration enforcement and explicitly encourages state officers to share information and cooperate with federal colleagues.

Two of the three objecting Justices — Samuel Alito and Clarence Thomas — agreed with this Constitutional logic but disagreed about which Arizona rules conflicted with the federal statute. The only major objection came from Justice Antonin Scalia, who offered an even more robust defense of state privileges going back to the Alien and Sedition Acts.

The 8-0 objection to President Obama turns on what Justice Samuel Alito describes in his objection as "a shocking assertion of federal executive power." The White House argued that Arizona's laws conflicted with its enforcement priorities, even if state laws complied with federal statutes to the letter. In effect, the White House claimed that it could invalidate any otherwise legitimate state law that it disagrees with.

Some powers do belong exclusively to the federal government, and control of citizenship and the borders is among them. But if Congress wanted to prevent states from using their own resources to check immigration status, it could. It never did so. The administration was in essence asserting that because it didn't want to carry out Congress's immigration wishes, no state should be allowed to do so either. Every Justice rightly rejected this remarkable claim.`);

// ============================================================
// 2012 考研英语一
// ============================================================
addPassage(2012, "Text1", null, `Come on — Everybody's doing it. That whispered message, half invitation and half forcing, is what most of us think of when we hear the words peer pressure. It usually leads to no good — drinking, drugs and casual sex. But in her new book Join the Club, Tina Rosenberg contends that peer pressure can also be a positive force through what she calls the social cure, in which organizations and officials use the power of group dynamics to help individuals improve their lives and possibly the world.

Rosenberg, the recipient of a Pulitzer Prize, offers a host of examples of the social cure in action: In South Carolina, a state-sponsored antismoking program called Rage Against the Haze sets out to make cigarettes uncool. In South Africa, an HIV-prevention initiative known as LoveLife recruits young people to promote safe sex among their peers.

The idea seems promising, and Rosenberg is a perceptive observer. Her critique of the lameness of many public-health campaigns is spot-on: they fail to mobilize peer pressure for healthy habits, and they demonstrate a seriously flawed understanding of psychology. "Dare to be different, please don't smoke!" pleads one billboard campaign aimed at reducing smoking among teenagers — teenagers, who desire nothing more than fitting in. Rosenberg argues convincingly that public-health advocates ought to take a page from advertisers, so skilled at applying peer pressure.

But on the general effectiveness of the social cure, Rosenberg is less persuasive. Join the Club is filled with too much irrelevant detail and not enough exploration of the social and biological factors that make peer pressure so powerful. The most glaring flaw of the social cure as it's presented here is that it doesn't work very well for very long. Rage Against the Haze failed once state funding was cut. Evidence that the LoveLife program produces lasting changes is limited and mixed.

There's no doubt that our peer groups exert enormous influence on our behavior. An emerging body of research shows that positive health habits — as well as negative ones — spread through networks of friends via social communication. This is a subtle form of peer pressure: we unconsciously imitate the behavior we see every day.

Far less certain, however, is how successfully experts and bureaucrats can select our peer groups and steer their activities in virtuous directions. It's like the teacher who breaks up the troublemakers in the back row by pairing them with better-behaved classmates. The tactic never really works. And that's the problem with a social cure engineered from the outside: in the real world, as in school, we insist on choosing our own friends.`);

addPassage(2012, "Text2", null, `A deal is a deal — except, apparently, when Entergy is involved. The company, a major energy supplier in New England, provoked justified outrage in Vermont last week when it announced it was reneging on a longstanding commitment to abide by the strict nuclear regulations.

Instead, the company has done precisely what it had long promised it would not challenge the constitutionality of Vermont's rules in the federal court, as part of a desperate effort to keep its Vermont Yankee nuclear power plant running. It's a stunning move.

The conflict has been surfacing since 2002, when the corporation bought Vermont's only nuclear power plant, an aging reactor in Vernon. As a condition of receiving state approval for the sale, the company agreed to seek permission from state regulators to operate past 2012. In 2006, the state went a step further, requiring that any extension of the plant's license be subject to Vermont legislature's approval. Then, too, the company went along.

Either Entergy never really intended to live by those commitments, or it simply didn't foresee what would happen next. A string of accidents, including the partial collapse of a cooling tower in 2007 and the discovery of an underground pipe system leakage, raised serious questions about both Vermont Yankee's safety and Entergy's management — especially after the company made misleading statements about the pipe. Enraged by Entergy's behavior, the Vermont Senate voted 26 to 4 last year against allowing an extension.

Now the company is suddenly claiming that the 2002 agreement is invalid because of the 2006 legislation, and that only the federal government has regulatory power over nuclear issues. The legal issues in the case are obscure: whereas the Supreme Court has ruled that states do have some regulatory authority over nuclear power, legal scholars say that Vermont case will offer a precedent-setting test of how far those powers extend. Certainly, there are valid concerns about the patchwork regulations that could result if every state sets its own rules. But had Entergy kept its word, that debate would be beside the point.

The company seems to have concluded that its reputation in Vermont is already so damaged that it has nothing left to lose by going to war with the state. But there should be consequences. Permission to run a nuclear plant is a public trust. Entergy runs 11 other reactors in the United States, including Pilgrim Nuclear station in Plymouth. Pledging to run Pilgrim safely, the company has applied for federal permission to keep it open for another 20 years. But as the Nuclear Regulatory Commission (NRC) reviews the company's application, it should keep in mind what promises from Entergy are worth.`);

addPassage(2012, "Text3", null, `In the idealized version of how science is done, facts about the world are waiting to be observed and collected by objective researchers who use the scientific method to carry out their work. But in the everyday practice of science, discovery frequently follows an ambiguous and complicated route. We aim to be objective, but we cannot escape the context of our unique life experience. Prior knowledge and interest influence what we experience, what we think our experiences mean, and the subsequent actions we take. Opportunities for misinterpretation, error, and self-deception abound.

Consequently, discovery claims should be thought of as protoscience. Similar to newly staked mining claims, they are full of potential. But it takes collective scrutiny and acceptance to transform a discovery claim into a mature discovery. This is the credibility process, through which the individual researcher's me, here, now becomes the community's anyone, anywhere, anytime. Objective knowledge is the goal, not the starting point.

Once a discovery claim becomes public, the discoverer receives intellectual credit. But, unlike with mining claims, the community takes control of what happens next. Within the complex social structure of the scientific community, researchers make discoveries; editors and reviewers act as gatekeepers by controlling the publication process; other scientists use the new finding to suit their own purposes; and finally, the public (including other scientists) receives the new discovery and possibly accompanying technology. As a discovery claim works it through the community, the interaction and confrontation between shared and competing beliefs about the science and the technology involved transforms an individual's discovery claim into the community's credible discovery.

Two paradoxes exist throughout this credibility process. First, scientific work tends to focus on some aspect of prevailing knowledge that is viewed as incomplete or incorrect. Little reward accompanies duplication and confirmation of what is already known and believed. The goal is new-search, not re-search. Not surprisingly, newly published discovery claims and credible discoveries that appear to be important and convincing will always be open to challenge and potential modification or refutation by future researchers. Second, novelty itself frequently provokes disbelief. Nobel Laureate and physiologist Albert Szent-Györgyi once described discovery as "seeing what everybody has seen and thinking what nobody has thought." But thinking what nobody else has thought and telling others what they have missed may not change their views. Sometimes years are required for truly novel discovery claims to be accepted and appreciated.

In the end, credibility "happens" to a discovery claim — a process that corresponds to what philosopher Annette Baier has described as the commons of the mind. "We reason together, challenge, revise, and complete each other's reasoning and each other's conceptions of reason."`);

addPassage(2012, "Text4", null, `If the trade unionist Jimmy Hoffa were alive today, he would probably represent civil servants. When Hoffa's Teamsters were in their prime in 1960, only one in ten American government workers belonged to a union; now 36% do. In 2009 the number of unionists in America's public sector passed that of their fellow members in the private sector. In Britain, more than half of public-sector workers but only about 15% of private-sector ones are unionized.

There are three reasons for the public-sector unions' thriving. First, they can shut things down without suffering much in the way of consequences. Second, they are mostly bright and well-educated. A quarter of America's public-sector workers have a university degree. Third, they now dominate left-of-centre politics. Some of their ties go back a long way. Britain's Labor Party, as its name implies, has long been associated with trade unionism. Its current leader, Ed Miliband, owes his position to votes from public-sector unions.

At the state level their influence can be even more fearsome. Mark Baldassare of the Public Policy Institute of California points out that much of the state's budget is patrolled by unions. The teachers' unions keep an eye on schools, the CCPOA on prisons and a variety of labor groups on health care.

In many rich countries average wages in the state sector are higher than in the private one. But the real gains come in benefits and work practices. Politicians have repeatedly "backloaded" public-sector pay deals, keeping the pay increases modest but adding to holidays and especially pensions that are already generous.

Reform has been vigorously opposed, perhaps most egregiously in education, where charter schools, academies and merit pay all faced drawn-out battles. Even though there is plenty of evidence that the quality of the teachers is the most important variable, teachers' unions have fought against getting rid of bad ones and promoting good ones.

As the cost to everyone else has become clearer, politicians have begun to clamp down. In Wisconsin the unions have rallied thousands of supporters against Scott Walker, the hardline Republican governor. But many within the public sector suffer under the current system, too.

John Donahue at Harvard's Kennedy School points out that the norms of culture in Western civil services suit those who want to stay put but is bad for high achievers. The only American public-sector workers who earn well above $250,000 a year are university sports coaches and the president of the United States. Bankers' fat pay packets have attracted much criticism, but a public-sector system that does not reward high achievers may be a much bigger problem for America.`);

// ============================================================
// 2011 考研英语一
// ============================================================
addPassage(2011, "Text1", null, `The decision of the New York Philharmonic to hire Alan Gilbert as its next music director has been the talk of the classical-music world ever since the sudden announcement of his appointment in 2009. For the most part, the response has been favorable, to say the least. "Hooray! At last!" wrote Anthony Tommasini, a sober-sided classical-music critic.

One of the reasons why the appointment came as such a surprise, however, is that Gilbert is comparatively little known. Even Tommasini, who had advocated Gilbert's appointment in the Times, calls him "an unpretentious musician with no air of the formidable conductor about him." As a description of the next music director of an orchestra that has hitherto been led by musicians like Gustav Mahler and Pierre Boulez, that seems likely to have struck at least some Times readers as faint praise.

For my part, I have no idea whether Gilbert is a great conductor or even a good one. To be sure, he performs an impressive variety of interesting compositions, but it is not necessary for me to visit Avery Fisher Hall, or anywhere else, to hear interesting orchestral music. All I have to do is to go to my CD shelf, or boot up my computer and download still more recorded music from iTunes.

Devoted concertgoers who reply that recordings are no substitute for live performance are missing the point. For the time, attention, and money of the art-loving public, classical instrumentalists must compete not only with opera houses, dance troupes, theater companies, and museums, but also with the recorded performances of the great classical musicians of the 20th century. These recordings are cheap, available everywhere, and very often much higher in artistic quality than today's live performances; moreover, they can be "consumed" at a time and place of the listener's choosing. The widespread availability of such recordings has thus brought about a crisis in the institution of the traditional classical concert.

One possible response is for classical performers to program attractive new music that is not yet available on record. Gilbert's own interest in new music has been widely noted: Alex Ross, a classical-music critic, has described him as a man who is capable of turning the Philharmonic into "a markedly different, more vibrant organization." But what will be the nature of that difference? Merely expanding the orchestra's repertoire will not be enough. If Gilbert and the Philharmonic are to succeed, they must first change the relationship between America's oldest orchestra and the new audience it hopes to attract.`);

addPassage(2011, "Text2", null, `When Liam McGee departed as president of Bank of America in August, his explanation was surprisingly straight up. Rather than cloaking his exit in the usual vague excuses, he came right out and said he was leaving "to pursue my goal of running a company." Broadcasting his ambition was "very much my decision," McGee says. Within two weeks, he was talking for the first time with the board of Hartford Financial Services Group, which named him CEO and chairman on September 29.

McGee says leaving without a position lined up gave him time to reflect on what kind of company he wanted to run. It also sent a clear message to the outside world about his aspirations. And McGee isn't alone. In recent weeks the No.2 executives at Avon and American Express quit with the explanation that they were looking for a CEO post. As boards scrutinize succession plans in response to shareholder pressure, executives who don't get the nod also may wish to move on. A turbulent business environment also has senior managers cautious of letting vague pronouncements cloud their reputations.

As the first signs of recovery begin to take hold, deputy chiefs may be more willing to make the jump without a net. In the third quarter, CEO turnover was down 23% from a year ago as nervous boards stuck with the leaders they had, according to Liberum Research. As the economy picks up, opportunities will abound for aspiring leaders.

The decision to quit a senior position to look for a better one is unconventional. For years executives and headhunters have adhered to the rule that the most attractive CEO candidates are the ones who must be poached. Says Korn/Ferry senior partner Dennis Carey: "I can't think of a single search I've done where a board has not instructed me to look at sitting CEOs first."

Those who jumped without a job haven't always landed in top positions quickly. Ellen Marram quit as chief of Tropicana a decade ago, saying she wanted to be a CEO. It was a year before she became head of a tiny Internet-based commodities exchange. Robert Willumstad left Citigroup in 2005 with ambitions to be a CEO. He finally took that post at a major financial institution three years later.

Many recruiters say the old disgrace is fading for top performers. The financial crisis has made it more acceptable to be between jobs or to leave a bad one. "The traditional rule was it's safer to stay where you are, but that's been fundamentally inverted," says one headhunter. "The people who've been hurt the worst are those who've stayed too long."`);

addPassage(2011, "Text3", null, `The rough guide to marketing success used to be that you got what you paid for. No longer. While traditional "paid" media — such as television commercials and print advertisements — still play a major role, companies today can exploit many alternative forms of media. Consumers passionate about a product may create "owned" media by sending e-mail alerts about products and sales to customers registered with its Web site. The way consumers now approach the broad range of factors beyond conventional paid media.

Paid and owned media are controlled by marketers promoting their own products. For earned media, such marketers act as the initiator for users' responses. But in some cases, one marketer's owned media become another marketer's paid media — for instance, when an e-commerce retailer sells ad space on its Web site. We define such sold media as owned media whose traffic is so strong that other organizations place their content or e-commerce engines within that environment. This trend, which we believe is still in its infancy, effectively began with retailers and travel providers such as airlines and hotels and will no doubt go further. Johnson & Johnson, for example, has created BabyCenter, a stand-alone media property that promotes complementary and even competitive products. Besides generating income, the presence of other marketers makes the site seem objective, gives companies opportunities to learn valuable information about the appeal of other companies' marketing, and may help expand user traffic for all companies concerned.

The same dramatic technological changes that have provided marketers with more (and more diverse) communications choices have also increased the risk that passionate consumers will voice their opinions in quicker, more visible, and much more damaging ways. Such hijacked media are the opposite of earned media: an asset or campaign becomes hostage to consumers, other stakeholders, or activists who make negative allegations about a brand or product. Members of social networks, for instance, are learning that they can hijack media to apply pressure on the businesses that originally created them.

If that happens, passionate consumers would try to persuade others to boycott products, putting the reputation of the target company at risk. In such a case, the company's response may not be sufficiently quick or thoughtful, and the learning curve has been steep. Toyota Motor, for example, alleviated some of the damage from its recall crisis earlier this year with a relatively quick and well-orchestrated social-media response campaign, which included efforts to engage with consumers directly on sites such as Twitter and the social-news site Digg.`);

addPassage(2011, "Text4", null, `It's no surprise that Jennifer Senior's insightful, provocative magazine cover story, "I Love My Children, I Hate My Life," is arousing much chatter — nothing gets people talking like the suggestion that child rearing is anything less than a completely fulfilling, life-enriching experience. Rather than concluding that children make parents either happy or miserable, Senior suggests we need to redefine happiness: instead of thinking of it as something that can be measured by moment-to-moment joy, we should consider being happy as a past-tense condition. Even though the day-to-day experience of raising kids can be soul-crushingly hard, Senior writes that "the very things that in the moment dampen our moods can later be sources of intense gratification and delight."

The magazine cover showing an attractive mother holding a cute baby is hardly the only Madonna-and-child image on newsstands this week. There are also stories about newly adoptive — and newly single — mom Sandra Bullock, as well as the usual "Jennifer Aniston is pregnant" news. Practically every week features at least one celebrity mom, or mom-to-be, smiling on the newsstands.

In a society that so persistently celebrates procreation, is it any wonder that admitting you regret having children is equivalent to admitting you support kitten-killing? It doesn't seem quite fair, then, to compare the regrets of parents to the regrets of the children. Unhappy parents rarely are provoked to wonder if they shouldn't have had kids, but unhappy childless folks are bothered with the message that children are the single most important thing in the world: obviously their misery must be a direct result of the gaping baby-size holes in their lives.

Of course, the image of parenthood that celebrity magazines like Us Weekly and People present is hugely unrealistic, especially when the parents are single mothers like Bullock. According to several studies concluding that parents are less happy than childless couples, single parents are the least happy of all. No shock there, considering how much work it is to raise a kid without a partner to lean on; yet to hear Sandra and Britney tell it, raising a kid on their "own" (read: with round-the-clock help) is a piece of cake.

It's hard to imagine that many people are dumb enough to want children just because Reese and Angelina make it look so glamorous: most adults understand that a baby is not a haircut. But it's interesting to wonder if the images we see every week of stress-free, happiness-enhancing parenthood aren't in some small, subconscious way contributing to our own dissatisfactions with the actual experience, in the same way that a small part of us hoped getting "the Rachel" might make us look just a little bit like Jennifer Aniston.`);

// ============================================================
// 2010 考研英语一
// ============================================================
addPassage(2010, "Text1", null, `Of all the changes that have taken place in English-language newspapers during the past quarter-century, perhaps the most far-reaching has been the inexorable decline in the scope and seriousness of their arts coverage.

It is difficult to the point of impossibility for the average reader under the age of forty to imagine a time when high-quality arts criticism could be found in most big-city newspapers. Yet a considerable number of the most significant collections of criticism published in the 20th century consisted in large part of newspaper reviews. To read such books today is to marvel at the fact that their learned contents were once deemed suitable for publication in general-circulation dailies.

We are even farther removed from the unfocused newspaper reviews published in England between the turn of the 20th century and the eve of World War II, at a time when newsprint was dirt-cheap and stylish arts criticism was considered an ornament to the publications in which it appeared. In those far-off days, it was taken for granted that the critics of major papers would write in detail and at length about the events they covered. Theirs was a serious business, and even those reviewers who wore their learning lightly, like George Bernard Shaw and Ernest Newman, could be trusted to know what they were about. These men believed in journalism as a calling, and were proud to be published in the daily press. "So few authors have brains enough or literary gift enough to keep their own end up in journalism," Newman wrote, "that I am tempted to define 'journalism' as 'a term of contempt applied by writers who are not read to writers who are.'"

Unfortunately, these critics are virtually forgotten. Neville Cardus, who wrote for the Manchester Guardian from 1917 until shortly before his death in 1975, is now known solely as a writer of essays on the game of cricket. During his lifetime, though, he was also one of England's foremost classical-music critics, a stylist so widely admired that his Autobiography (1947) became a best-seller. He was knighted in 1967, the first music critic to be so honored. Yet only one of his books is now in print, and his vast body of writings on music is unknown save to specialists.

Is there any chance that Cardus's criticism will enjoy a revival? The prospect seems remote. Journalistic tastes had changed long before his death, and postmodern readers have little use for the richly upholstered Vicwardian prose in which he specialized. Moreover, the amateur tradition in music criticism has been in headlong retreat.`);

addPassage(2010, "Text2", null, `Over the past decade, thousands of patents have been granted for what are called business methods. Amazon.com received one for its "one-click" online payment system. Merrill Lynch got legal protection for an asset allocation strategy. One inventor patented a technique for lifting a box.

Now the nation's top patent court appears completely ready to scale back on business-method patents, which have been controversial ever since they were first authorized 10 years ago. In a move that has intellectual-property lawyers abuzz the U.S. Court of Appeals for the Federal Circuit said it would use a particular case to conduct a broad review of business-method patents. In re Bilski, as the case is known, is "a very big deal," says Dennis D. Crouch of the University of Missouri School of Law. It "has the potential to eliminate an entire class of patents."

Curbs on business-method claims would be a dramatic about-face, because it was the Federal Circuit itself that introduced such patents with its 1998 decision in the so-called State Street Bank case, approving a patent on a way of pooling mutual-fund assets. That ruling produced an explosion in business-method patent filings, initially by emerging internet companies trying to stake out exclusive rights to specific types of online transactions. Later, more established companies raced to add such patents to their files, if only as a defensive move against rivals that might beat them to the punch. In 2005, IBM noted in a court filing that it had been issued more than 300 business-method patents despite the fact that it questioned the legal basis for granting them. Similarly, some Wall Street investment firms armed themselves with patents for financial products, even as they took positions in court cases opposing the practice.

The Bilski case involves a claimed patent on a method for hedging risk in the energy market. The Federal Circuit issued an unusual order stating that the case would be heard by all 12 of the court's judges, rather than a typical panel of three, and that one issue it wants to evaluate is whether it should "reconsider" its State Street Bank ruling.

The Federal Circuit's action comes in the wake of a series of recent decisions by the Supreme Court that has narrowed the scope of protections for patent holders. Last April, for example, the justices signaled that too many patents were being upheld for "inventions" that are obvious. The judges on the Federal Circuit are "reacting to the anti-patent trend at the Supreme Court," says Harold C. Wegner, a patent attorney and professor at George Washington University Law School.`);

addPassage(2010, "Text3", null, `In his book The Tipping Point, Malcolm Gladwell argues that social epidemics are driven in large part by the acting of a tiny minority of special individuals, often called influentials, who are unusually informed, persuasive, or well-connected. The idea is intuitively compelling, but it doesn't explain how ideas actually spread.

The supposed importance of influentials derives from a plausible sounding but largely untested theory called the "two-step flow of communication": Information flows from the media to the influentials and from them to everyone else. Marketers have embraced the two-step flow because it suggests that if they can just find and influence the influentials, those selected people will do most of the work for them. The theory also seems to explain the sudden and unexpected popularity of certain looks, brands, or neighborhoods. In many such cases, a cursory search for causes finds that some small group of people was wearing, promoting, or developing whatever it is before anyone else paid attention. Anecdotal evidence of this kind fits nicely with the idea that only certain special people can drive trends.

In their recent work, however, some researchers have come up with the finding that influentials have far less impact on social epidemics than is generally supposed. In fact, they don't seem to be required at all.

The researchers' argument stems from a simple observation about social influence: With the exception of a few celebrities like Oprah Winfrey — whose outsize presence is primarily a function of media, not interpersonal, influence — even the most influential members of a population simply don't interact with that many others. Yet it is precisely these non-celebrity influentials who, according to the two-step-flow theory, are supposed to drive social epidemics by influencing their friends and colleagues directly. For a social epidemic to occur, however, each person so affected must then influence his or her own acquaintances, who must in turn influence theirs, and so on; and just how many others pay attention to each of these people has little to do with the initial influential. If people in the network just two degrees removed from the initial influential prove resistant, for example, the cascade of change won't propagate very far or affect many people.

Building on the basic truth about interpersonal influence, the researchers studied the dynamics of social influence by manipulating a number of variables relating to people's ability to influence others and their tendency to be influenced. They found that the principal requirement for what they call "global cascades" — the widespread propagation of influence through networks — is the presence not of a few influentials but, rather, of a critical mass of easily influenced people, each of whom adopts, say, a look or a brand after being exposed to a single adopting neighbor. Regardless of how influential an individual is locally, he or she can exert global influence only if this critical mass is available to propagate a chain reaction.`);

addPassage(2010, "Text4", null, `Bankers have been blaming themselves for their troubles in public. Behind the scenes, they have been taking aim at someone else: the accounting standard-setters. Their rules, moan the banks, have forced them to report enormous losses, and it's just not fair. These rules say they must value some assets at the price a third party would pay, not the price managers and regulators would like them to fetch.

Unfortunately, banks' lobbying now seems to be working. The details may be unknowable, but the independence of standard-setters, essential to the proper functioning of capital markets, is being compromised. And, unless banks carry toxic assets at prices that attract buyers, reviving the banking system will be difficult.

After a bruising encounter with Congress, America's Financial Accounting Standards Board (FASB) rushed through rule changes. These gave banks more freedom to use models to value illiquid assets and more flexibility in recognizing losses on long-term assets in their income statement. Bob Herz, the FASB's chairman, cried out against those who "question our motives." Yet bank shares rose and the changes enhance what one lobby group politely calls "the use of judgment by management."

European ministers instantly demanded that the International Accounting Standards Board (IASB) do likewise. The IASB says it does not want to act without overall planning, but the pressure to fold when it completes its reconstruction of rules later this year is strong. Charlie McCreevy, a European commissioner, warned the IASB that it did "not live in a political vacuum" but "in the real world" and that Europe could yet develop different rules.

It was banks that were on the wrong planet, with accounts that vastly overvalued assets. Today they argue that market prices overstate losses, because they largely reflect the temporary illiquidity of markets, not the likely extent of bad debts. The truth will not be known for years. But banks' shares trade below their book value, suggesting that investors are skeptical. And dead markets partly reflect the paralysis of banks which will not sell assets for fear of booking losses, yet are reluctant to buy all those supposed bargains.

To get the system working again, losses must be recognized and dealt with. America's new plan to buy up toxic assets will not work unless banks mark assets to levels which buyers find attractive. Successful markets require independent and even combative standard-setters. The FASB and IASB have been exactly that, cleaning up rules on stock options and pensions, for example, against hostility from special interests. But by giving in to critics now they are inviting pressure to make more concessions.`);

// ============================================================
// 2009 考研英语一
// ============================================================
addPassage(2009, "Text1", null, `Habits are a funny thing. We reach for them mindlessly, setting our brains on auto-pilot and relaxing into the unconscious comfort of familiar routine. "Not choice, but habit rules the unreflecting herd," William Wordsworth said in the 19th century. In the ever-changing 21st century, even the word "habit" carries a negative connotation.

So it seems antithetical to talk about habits in the same context as creativity and innovation. But brain researchers have discovered that when we consciously develop new habits, we create parallel synaptic paths, and even entirely new brain cells, that can jump our trains of thought onto new, innovative tracks.

But don't bother trying to kill off old habits; once those ruts of procedure are worn into the hippocampus, they're there to stay. Instead, the new habits we deliberately ingrain into ourselves create parallel pathways that can bypass those old roads.

"The first thing needed for innovation is a fascination with wonder," says Dawna Markova, author of "The Open Mind" and an executive change consultant for Professional Thinking Partners. "But we are taught instead to 'decide,' just as our president calls himself 'the Decider.'" She adds, however, that "to decide is to kill off all possibilities but one. A good innovational thinker is always exploring the many other possibilities."

All of us work through problems in ways of which we're unaware, she says. Researchers in the late 1960s discovered that humans are born with the capacity to approach challenges in four primary ways: analytically, procedurally, relationally (or collaboratively) and innovatively. At puberty, however, the brain shuts down half of that capacity, preserving only those modes of thought that have seemed most valuable during the first decade or so of life.

The current emphasis on standardized testing highlights analysis and procedure, meaning that few of us inherently use our innovative and collaborative modes of thought. "This breaks the major rule in the American belief system — that anyone can do anything," explains M. J. Ryan, author of the 2006 book "This Year I Will..." and Ms. Markova's business partner. "That's a lie that we have perpetuated, and it fosters commonness. Knowing what you're good at and doing even more of it creates excellence." This is where developing new habits comes in.`);

addPassage(2009, "Text2", null, `It is a wise father that knows his own child, but today a man can boost his paternal (fatherly) wisdom — or at least confirm that he's the kid's dad. All he needs to do is shell out $30 for a paternity testing kit (PTK) at his local drugstore — and another $120 to get the results.

More than 60,000 people have purchased the PTKs since they first became available without prescriptions last year, according to Doug Fog, chief operating officer of Identigene, which makes the over-the-counter kits. More than two dozen companies sell DNA tests directly to the public, ranging in price from a few hundred dollars to more than $2500.

Among the most popular: paternity and kinship testing, which adopted children can use to find their biological relatives and families can use to track down kids put up for adoption. DNA testing is also the latest rage among passionate genealogists — and supports businesses that offer to search for a family's geographic roots.

Most tests require collecting cells by swabbing saliva in the mouth and sending it to the company for testing. All tests require a potential candidate with whom to compare DNA.

But some observers are skeptical. "There is a kind of false precision being hawked by people claiming they are doing ancestry testing," says Troy Duster, a New York University sociologist. He notes that each individual has many ancestors — numbering in the hundreds just a few centuries back. Yet most ancestry testing only considers a single lineage, either the Y chromosome inherited through men in a father's line or mitochondrial DNA, which is passed down only from mothers. This DNA can reveal genetic information about only one or two ancestors, even though, for example, just three generations back people also have six other great-grandparents or, four generations back, 14 other great-great-grandparents.

Critics also argue that commercial genetic testing is only as good as the reference collections to which a sample is compared. Databases used by some companies don't rely on data collected systematically but rather lump together information from different research projects. This means that a DNA database may differ depending on the company that processes the results. In addition, the computer programs a company uses to estimate relationships may be patented and not subject to peer review or outside evaluation.`);

addPassage(2009, "Text3", null, `The relationship between formal education and economic growth in poor countries is widely misunderstood by economists and politicians alike. Progress in both areas is undoubtedly necessary for the social, political and intellectual development of these and all other societies; however, the conventional view that education should be one of the very highest priorities for promoting rapid economic development in poor countries is wrong. We are fortunate that it is, because new educational systems there and putting enough people through them to improve economic performance would require two or three generations. The findings of a research institution have consistently shown that workers in all countries can be trained on the job to achieve radically higher productivity and, as a result, radically higher standards of living.

Ironically, the first evidence for this idea appeared in the United States. Not long ago, with the country entering a recession and Japan at its pre-bubble peak, the U.S. workforce was derided as poorly educated and one of the primary causes of the poor U.S. economic performance. Japan was, and remains, the global leader in automotive-assembly productivity. Yet the research revealed that the U.S. factories of Honda, Nissan, and Toyota achieved about 95 percent of the productivity of their Japanese counterparts — a result of the training that U.S. workers received on the job.

More recently, while examining housing construction, the researchers discovered that illiterate, non-English-speaking Mexican workers in Houston, Texas, consistently met best-practice labor productivity standards despite the complexity of the building industry's work.

What is the real relationship between education and economic development? We have to suspect that continuing economic growth promotes the development of education even when governments don't force it. After all, that's how education got started. When our ancestors were hunters and gatherers 10,000 years ago, they didn't have time to wonder much about anything besides finding food. Only when humanity began to get its food in a more productive way was there time for other things.

As education improved, humanity's productivity potential increased as well. As productivity increased, they could in turn afford more education. This increasingly high level of education is probably a necessary, but not a sufficient, condition for the complex political systems required by advanced economic performance. Thus poor countries might not be able to escape their poverty traps without political changes that may be possible only with broader formal education. A lack of formal education, however, doesn't constrain the ability of the developing world's workforce to substantially improve productivity for the foreseeable future. On the contrary, constraints on improving productivity explain why education isn't developing more quickly there than it is.`);

addPassage(2009, "Text4", null, `The most thoroughly studied intellectuals in the history of the New World are the ministers and political leaders of seventeenth-century New England. According to the standard history of American philosophy, nowhere else in colonial America was "so much importance attached to intellectual pursuits." According to many books and articles, New England's leaders established the basic themes and preoccupations of an unfolding, dominant Puritan tradition in American intellectual life.

To take this approach to the New Englanders normally means to start with the Puritans' theological innovations and their distinctive ideas about the church — important subjects that we may not neglect. But in keeping with our examination of southern intellectual life, we may consider the original Puritans as carriers of European culture adjusting to New World circumstances. The New England colonies were the scenes of important episodes in the pursuit of widely understood ideals of civility and virtuosity.

The early settlers of Massachusetts Bay included men of impressive education and influence in England. Besides the ninety or so learned ministers who came to Massachusetts churches in the decade after 1629, there were political leaders like John Winthrop, an educated gentleman, lawyer, and official of the Crown before he journeyed to Boston. These men wrote and published extensively, reaching both New World and Old World audiences, and giving New England an atmosphere of intellectual earnestness.

We should not forget, however, that most New Englanders were less well educated. While few craftsmen or farmers, let alone dependents and servants, left literary compositions to be analyzed, their thinking often had a traditional superstitious quality. A tailor named John Dane, who emigrated in the late 1630s, left an account of his reasons for leaving England that is filled with signs of sexual confusion, economic frustrations, and religious hope — all name together in a decisive moment when he opened the Bible, told his father the first line he saw would settle his fate, and read the magical words: "Come out from among them, touch no unclean thing, and I will be your God and you shall be my people." One wonders what Dane thought of the careful sermons explaining the Bible that he heard in Puritan churches.

Meanwhile, many settlers had slighter religious commitments than Dane's, as one clergyman learned in confronting folk along the coast who mocked that they had not come to the New World for religion. "Our main end was to catch fish."`);

// ============================================================
// 2008 考研英语一
// ============================================================
addPassage(2008, "Text1", null, `While still catching-up to men in some spheres of modern life, women appear to be way ahead in at least one undesirable category. "Women are particularly susceptible to developing depression and anxiety disorders in response to stress compared to men," according to Dr. Yehuda, chief psychiatrist at New York's Veteran's Administration Hospital.

Studies of both animals and humans have shown that sex hormones somehow affect the stress response, causing females under stress to produce more of the trigger chemicals than do males under the same conditions. In several of the studies, when stressed-out female rats had their ovaries (the female reproductive organs) removed, their chemical responses became equal to those of the males.

Adding to a woman's increased dose of stress chemicals, are her increased "opportunities" for stress. "It's not necessarily that women don't cope as well. It's just that they have so much more to cope with," says Dr. Yehuda. "Their capacity for tolerating stress may even be greater than men's," she observes, "it's just that they're dealing with so many more things that they become worn out from it more visibly and sooner."

Dr. Yehuda notes another difference between the sexes. "I think that the kinds of things that women are exposed to tend to be in more of a chronic or repeated nature. Men go to war and are exposed to combat stress. Men are exposed to more acts of random physical violence. The kinds of interpersonal violence that women are exposed to tend to be in domestic situations, by, unfortunately, parents or other family members, and they tend not to be one-shot deals. The wear-and-tear that comes from these longer relationships can be quite devastating."

Adeline Alvarez married at 18 and gave birth to a son, but was determined to finish college. "I struggled a lot to get the college degree. I was living in so much frustration that that was my escape, to go to school, and get ahead and do better." Later, her marriage ended and she became a single mother. "It's the hardest thing to take care of a teenager, have a job, pay the rent, pay the car payment, and pay the debt. I lived from paycheck to paycheck."

Not everyone experiences the kinds of severe chronic stresses Alvarez describes. But most women today are coping with a lot of obligations, with few breaks, and feeling the strain. Alvarez's experience demonstrates the importance of finding ways to diffuse stress before it threatens your health and your ability to function.`);

addPassage(2008, "Text2", null, `It used to be so straightforward. A team of researchers working together in the laboratory would submit the results of their research to a journal. A journal editor would then remove the authors' names and affiliations from the paper and send it to their peers for review. Depending on the comments received, the editor would accept the paper for publication or decline it. Copyright rested with the journal publisher, and researchers seeking knowledge of the results would have to subscribe to the journal.

No longer. The Internet — and pressure from funding agencies, who are questioning why commercial publishers are making money from government-funded research by restricting access to it — is making access to scientific results a reality. The Organization for Economic Co-operation and Development (OECD) has just issued a report describing the far-reaching consequences of this. The report, by John Houghton of Victoria University in Australia and Graham Vickery of the OECD, makes heavy reading for publishers who have, so far, made handsome profits. But it goes further than that. It signals a change in what has, until now, been a key element of scientific endeavor.

The value of knowledge and the return on the public investment in research depends, in part, upon wide distribution and ready access. It is big business. In America, the core scientific publishing market is estimated at between $7 billion and $11 billion. The International Association of Scientific, Technical and Medical Publishers says that there are more than 2,000 publishers worldwide specializing in these subjects. They publish more than 1.2 million articles each year in some 16,000 journals.

This is now changing. According to the OECD report, some 75% of scholarly journals are now online. Entirely new business models are emerging; three main ones were identified by the report's authors. There is the so-called big deal, where institutional subscribers pay for access to a collection of online journal titles through site-licensing agreements. There is open-access publishing, typically supported by asking the author (or his employer) to pay for the paper to be published. Finally, there are open-access archives, where organizations such as universities or international laboratories support institutional repositories. Other models exist that are hybrids of these three, such as delayed open-access, where journals allow only subscribers to read a paper for the first six months, before making it freely available to everyone who wishes to see it. All this could change the traditional form of the peer-review process, at least for the publication of papers.`);

addPassage(2008, "Text3", null, `In the early 1960s Wilt Chamberlain was one of only three players in the National Basketball Association (NBA) listed at over seven feet. If he had played last season, however, he would have been one of 42. The bodies playing major professional sports have changed dramatically over the years, and managers have been more than willing to adjust team uniforms to fit the growing numbers of bigger, longer frames.

The trend in sports, though, may be obscuring an unrecognized reality: Americans have generally stopped growing. Though typically about two inches taller now than 140 years ago, today's people — especially those born to families who have lived in the U.S. for many generations — apparently reached their limit in the early 1960s. And they aren't likely to get any taller. "In the general population today, at this genetic, environmental level, we've pretty much gone as far as we can go," says anthropologist William Cameron Chumlea of Wright State University. In the case of NBA players, their increase in height appears to result from the increasingly common practice of recruiting players from all over the world.

Growth, which rarely continues beyond the age of 20, demands calories and nutrients — notably, protein — to feed expanding tissues. At the start of the 20th century, under-nutrition and childhood infections got in the way. But as diet and health improved, children and adolescents have, on average, increased in height by about an inch and a half every 20 years, a pattern known as the secular trend in height. Yet according to the Centers for Disease Control and Prevention, average height — 5'9" for men, 5'4" for women — hasn't really changed since 1960.

Genetically speaking, there are advantages to avoiding substantial height. During childbirth, larger babies have more difficulty passing through the birth canal. Moreover, even though humans have been upright for millions of years, our feet and back continue to struggle with bipedal posture and cannot easily withstand repeated strain imposed by oversize limbs. "There are some real constraints that are set by the genetic architecture of the individual organism," says anthropologist William Leonard of Northwestern University.

Genetic maximums can change, but don't expect this to happen soon. Claire C. Gordon, senior anthropologist at the Army Research Center in Natick, Mass., ensures that 90 percent of the uniforms and workstations fit recruits without alteration. She says that, unlike those for basketball, the length of military uniforms has not changed for some time. And if you need to predict human height in the near future to design a piece of equipment, Gordon says that by and large, "you could use today's data and feel fairly confident."`);

addPassage(2008, "Text4", null, `In 1784, five years before he became president of the United States, George Washington, 52, was nearly toothless. So he hired a dentist to transplant nine teeth into his jaw — having extracted them from the mouths of his slaves.

That's a far different image from the cherry-tree-chopping George most people remember from their history books. But recently, many historians have begun to focus on the roles slavery played in the lives of the founding generation. They have been spurred in part by DNA evidence made available in 1998, which almost certainly proved Thomas Jefferson had fathered at least one child with his slave Sally Hemings. And only over the past 30 years have scholars examined history from the bottom up. Works of several historians reveal the moral compromises made by the nation's early leaders and the fragile nature of the country's infancy. More significantly, they argue that many of the Founding Fathers knew slavery was wrong — and yet most did little to fight it.

More than anything, the historians say, the founders were hampered by the culture of their time. While Washington and Jefferson privately expressed distaste for slavery, they also understood that it was part of the political and economic bedrock of the country they helped to create.

For one thing, the South could not afford to part with its slaves. Owning slaves was "like having a large bank account," says Wiencek, author of An Imperfect God: George Washington, His Slaves, and the Creation of America. The southern states would not have signed the Constitution without protections for the "peculiar institution," including a clause that counted a slave as three fifths of a man for purposes of congressional representation.

And the statesmen's political lives depended on slavery. The three-fifths formula handed Jefferson his narrow victory in the presidential election of 1800 by inflating the votes of the southern states in the Electoral College. Once in office, Jefferson extended slavery with the Louisiana Purchase in 1803; the new land was carved into 13 states, including three slave states.

Still, Jefferson freed Hemings's children — though not Hemings herself or his approximately 150 other slaves. Washington, who had begun to believe that all men were created equal after observing the bravery of the black soldiers during the Revolutionary War, overcame the strong opposition of his relatives to grant his slaves their freedom in his will. Only a decade earlier, such an act would have required legislative approval in Virginia.`);

// ============================================================
// 2007 考研英语一
// ============================================================
addPassage(2007, "Text1", null, `If you were to examine the birth certificates of every soccer player in 2006's World Cup tournament, you would most likely find a noteworthy quirk: elite soccer players are more likely to have been born in the earlier months of the year than in the later months. If you then examined the European national youth teams that feed the World Cup and professional ranks, you would find this strange phenomenon to be even more pronounced.

What might account for this strange phenomenon? Here are a few guesses: a) certain astrological signs confer superior soccer skills; b) winter-born babies tend to have higher oxygen capacity, which increases soccer stamina; c) soccer-mad parents are more likely to conceive children in springtime, at the annual peak of soccer mania; d) none of the above.

Anders Ericsson, a 58-year-old psychology professor at Florida State University, says he believes strongly in "none of the above." Ericsson grew up in Sweden, and studied nuclear engineering until he realized he would have more opportunity to conduct his own research if he switched to psychology. His first experiment, nearly 30 years ago, involved memory: training a person to hear and then repeat a random series of numbers. "With the first subject, after about 20 hours of training, his digit span had risen from 7 to 20," Ericsson recalls. "He kept improving, and after about 200 hours of training he had risen to over 80 numbers."

This success, coupled with later research showing that memory itself is not genetically determined, led Ericsson to conclude that the act of memorizing is more of a cognitive exercise than an intuitive one. In other words, whatever inborn differences two people may exhibit in their abilities to memorize, those differences are swamped by how well each person "encodes" the information. And the best way to learn how to encode information meaningfully, Ericsson determined, was a process known as deliberate practice. Deliberate practice entails more than simply repeating a task. Rather, it involves setting specific goals, obtaining immediate feedback and concentrating as much on technique as on outcome.

Ericsson and his colleagues have thus taken to studying expert performers in a wide range of pursuits, including soccer. They gather all the data they can, not just performance statistics and biographical details but also the results of their own laboratory experiments with high achievers. Their work makes a rather startling assertion: the trait we commonly call talent is highly overrated. Or, put another way, expert performers — whether in memory or surgery, ballet or computer programming — are nearly always made, not born.`);

addPassage(2007, "Text2", null, `For the past several years, the Sunday newspaper supplement Parade has featured a column called "Ask Marilyn." People are invited to query Marilyn vos Savant, who at age 10 had tested at a mental level of someone about 23 years old; that gave her an IQ of 228 — the highest score ever recorded. IQ tests ask you to complete verbal and visual analogies, to envision paper after it has been folded and cut, and to deduce numerical sequences, among other similar tasks. So it is a bit confusing when vos Savant fields such queries from the average Joe (whose IQ is 100) as, What's the difference between love and fondness? Or what is the nature of luck and coincidence? It's not obvious how the capacity to visualize objects and to figure out numerical patterns suits one to answer questions that have eluded some of the best poets and philosophers.

Clearly, intelligence encompasses more than a score on a test. Just what does it mean to be smart? How much of intelligence can be specified, and how much can we learn about it from neurology, genetics, computer science and other fields?

The defining term of intelligence in humans still seems to be the IQ score, even though IQ tests are not given as often as they used to be. The test comes primarily in two forms: the Stanford-Binet Intelligence Scale and the Wechsler Intelligence Scales (both come in adult and children's version). Generally costing several hundred dollars, they are usually given only by psychologists, although variations of them populate bookstores and the World Wide Web. Superhigh scores like vos Savant's are no longer possible, because scoring is now based on a statistical population distribution among age peers, rather than simply dividing the mental age by the chronological age and multiplying by 100. Other standardized tests, such as the Scholastic Assessment Test (SAT) and the Graduate Record Exam (GRE), capture the main aspects of IQ tests.

Such standardized tests may not assess all the important elements necessary to succeed in school and in life, argues Robert J. Sternberg. In his article "How Intelligent Is Intelligence Testing?", Sternberg notes that traditional tests best assess analytical and verbal skills but fail to measure creativity and practical knowledge, components also critical to problem solving and life success. Moreover, IQ tests do not necessarily predict so well once populations or situations change. Research has found that IQ predicted leadership skills when the tests were given under low-stress conditions, but under high-stress conditions, IQ was negatively correlated with leadership — that is, it predicted the opposite. Anyone who has toiled through SAT will testify that test-taking skill also matters, whether it's knowing when to guess or what questions to skip.`);

addPassage(2007, "Text3", null, `During the past generation, the American middle-class family that once could count on hard work and fair play to keep itself financially secure has been transformed by economic risk and new realities. Now a pink slip, a bad diagnosis, or a disappearing spouse can reduce a family from solidly middle class to newly poor in a few months.

In just one generation, millions of mothers have gone to work, transforming basic family economics. Scholars, policymakers, and critics of all stripes have debated the social implications of these changes, but few have looked at the side effect: family risk has risen as well. Today's families have budgeted to the limits of their new two-paycheck status. As a result, they have lost the parachute they once had in times of financial setback — a back-up earner (usually Mom) who could go into the workforce if the primary earner got laid off or fell sick. This "added-worker effect" could support the safety net offered by unemployment insurance or disability insurance to help families weather bad times. But today, a disruption to family fortunes can no longer be made up with extra income from an otherwise-stay-at-home partner.

During the same period, families have been asked to absorb much more risk in their retirement income. Steelworkers, airline employees, and now those in the auto industry are joining millions of families who must worry about interest rates, stock market fluctuation, and the harsh reality that they may outlive their retirement money. For much of the past year, President Bush campaigned to move Social Security to a savings-account model, with retirees trading much or all of their guaranteed payments for payments depending on investment returns. For younger families, the picture is not any better. Both the absolute cost of healthcare and the share of it borne by families have risen — and newly fashionable health-savings plans are spreading from legislative halls to Wal-Mart workers, with much higher deductibles and a large new dose of investment risk for families' future healthcare. Even demographics are working against the middle class family, as the odds of having a weak elderly parent — and all the attendant need for physical and financial assistance — have jumped eightfold in just one generation.

From the middle-class family perspective, much of this, understandably, looks far less like an opportunity to exercise more financial responsibility, and a good deal more like a frightening acceleration of the wholesale shift of financial risk onto their already overburdened shoulders. The financial fallout has begun, and the political fallout may not be far behind.`);

addPassage(2007, "Text4", null, `It never rains but it pours. Just as bosses and boards have finally sorted out their worst accounting and compliance troubles, and improved their feeble corporation governance, a new problem threatens to earn them — especially in America — the sort of nasty headlines that inevitably lead to heads rolling in the executive suite: data insecurity. Left, until now, to odd, low-level IT staff to put right, and seen as a concern only of data-rich industries such as banking, telecoms and air travel, information protection is now high on the boss's agenda in businesses of every variety.

Several massive leakages of customer and employee data this year — from organizations as diverse as Time Warner, the American defense contractor Science Applications International Corp and even the University of California, Berkeley — have left managers hurriedly peering into their intricate IT systems and business processes in search of potential vulnerabilities.

"Data is becoming an asset which needs to be guarded as much as any other asset," says Haim Mendelson of Stanford University's business school. "The ability to guard customer data is the key to market value, which the board is responsible for on behalf of shareholders." Indeed, just as there is the concept of Generally Accepted Accounting Principles (GAAP), perhaps it is time for GASP, Generally Accepted Security Practices, suggested Eli Noam of New York's Columbia Business School. "Setting the proper investment level for security, redundancy, and recovery is a management issue, not a technical one," he says.

The mystery is that this should come as a surprise to any boss. Surely it should be obvious to the dimmest executive that trust, that most valuable of economic assets, is easily destroyed and hugely expensive to restore — and that few things are more likely to destroy trust than a company letting sensitive personal data get into the wrong hands.

The current state of affairs may have been encouraged — though not justified — by the lack of legal penalty (in America, but not Europe) for data leakage. Until California recently passed a law, American firms did not have to tell anyone, even the victim, when data went astray. That may change fast: lots of proposed data-security legislation is now doing the rounds in Washington, D.C. Meanwhile, the theft of information about some 40 million credit-card accounts in America, disclosed on June 17th, overshadowed a hugely important decision a day earlier by America's Federal Trade Commission (FTC) that puts corporate America on notice that regulators will act if firms fail to provide adequate data security.`);

module.exports = { PASSAGES, parsePassageText };

async function tryRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const pool = new Pool({
    host,
    port: 6543,
    database: "postgres",
    user: `postgres.${PROJECT_REF}`,
    password: PASSWORD,
    ssl: { rejectUnauthorized: false },
  });
  try {
    const client = await pool.connect();
    const { rows } = await client.query("SELECT 1 AS ok");
    client.release();
    await pool.end();
    return rows[0].ok === 1;
  } catch (e) {
    await pool.end();
    return false;
  }
}

async function main() {
  const HOST = "2406:da1c:4c7:f800:6ed7:dc9b:6c10:4e8a";
  const pool = new Pool({
    host: HOST,
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: PASSWORD,
    ssl: {
      rejectUnauthorized: false,
      servername: "db.sgkaybgsuvgjhddmjkct.supabase.co",
    },
    family: 6,
  });

  console.log("正在连接 Supabase 数据库 (IPv6 直连)...\n");
  const client = await pool.connect();

  try {
    console.log(`开始导入 ${PASSAGES.length} 篇文章...\n`);

    for (let i = 0; i < PASSAGES.length; i++) {
      const p = PASSAGES[i];
      const content = parsePassageText(p.content);

      if (content.paragraphs.length === 0) {
        console.log(`  ⚠️  [${i + 1}] ${p.year} ${p.text_num}: 解析失败，跳过`);
        continue;
      }

      try {
        await client.query(
          `INSERT INTO passages (year, text_num, title, content)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (year, text_num) DO UPDATE SET
             title = EXCLUDED.title,
             content = EXCLUDED.content,
             updated_at = now()`,
          [p.year, p.text_num, p.title, JSON.stringify(content)]
        );
        console.log(
          `  ✅ [${i + 1}] ${p.year} ${p.text_num}: ${content.paragraphs.length} 段落, ${content.paragraphs.flatMap((pa) => pa.sentences).length} 句子`
        );
      } catch (err) {
        console.log(`  ❌ [${i + 1}] ${p.year} ${p.text_num}: ${err.message}`);
      }
    }

    const { rows: count } = await client.query(
      "SELECT COUNT(*) AS total FROM passages"
    );
    console.log(`\n✅ 导入完成！数据库中共有 ${count[0].total} 篇文章`);
  } finally {
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  main();
}
