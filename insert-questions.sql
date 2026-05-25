-- 考研英语一阅读题目数据插入脚本
-- 共 373 道题目
-- 生成时间: 2026-05-25

-- 使用 CTE 获取 passage_id 并插入题目

-- 批次 1/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2007 as year, 'Text1' as text_num, 21 as question_number, 'The birthday phenomenon found among soccer players is mentioned to' as question_text, 'stress the importance of professional training.' as option_a, 'spotlight the soccer superstars in the World Cup.' as option_b, 'introduce the topic of what makes expert performance.' as option_c, 'explain why some soccer teams play better than others.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text1' as text_num, 23 as question_number, 'According to Ericsson, good memory' as question_text, 'depends on meaningful processing of information.' as option_a, 'results from intuitive rather than cognitive exercises.' as option_b, 'is determined by genetic rather than psychological factors.' as option_c, 'requires immediate feedback and a high degree of concentration.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text1' as text_num, 24 as question_number, 'Ericsson and his colleagues believe that' as question_text, 'talent is a dominating factor for professional success.' as option_a, 'biographical data provide the key to excellent performance.' as option_b, 'the role of talent tends to be overlooked.' as option_c, 'high achievers owe their success mostly to nurture.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text2' as text_num, 26 as question_number, 'Which of the following may be required in an intelligence test?' as question_text, 'Answering philosophical questions.' as option_a, 'Folding or cutting paper into different shapes.' as option_b, 'Telling the differences between certain concepts.' as option_c, 'Choosing words or graphs similar to the given ones.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text2' as text_num, 27 as question_number, 'What can be inferred about intelligence testing from Paragraph 3?' as question_text, 'People no longer use IQ scores as an indicator of intelligence.' as option_a, 'More versions of IQ tests are now available on the Internet.' as option_b, 'The test contents and formats for adults and children may be different.' as option_c, 'Scientists have defined the important elements of human intelligence.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text2' as text_num, 28 as question_number, 'People nowadays can no longer achieve IQ scores as high as Vos Savant''s because' as question_text, 'the scores are obtained through different computational procedures.' as option_a, 'creativity rather than analytical skills is emphasized now.' as option_b, 'Vos Savant''s case is an extreme one that will not repeat.' as option_c, 'the defining characteristic of IQ tests has changed.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text2' as text_num, 29 as question_number, 'We can conclude from the last paragraph that' as question_text, 'test scores may not be reliable indicators of one''s ability.' as option_a, 'IQ scores and SAT results are highly correlated.' as option_b, 'testing involves a lot of guesswork.' as option_c, 'traditional tests are out of date.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text2' as text_num, 30 as question_number, 'What is the author''s attitude towards IQ tests?' as question_text, 'Supportive.' as option_a, 'Skeptical.' as option_b, 'Impartial.' as option_c, 'Biased.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text3' as text_num, 31 as question_number, 'Today''s double-income families are at greater financial risk in that' as question_text, 'the safety net they used to enjoy has disappeared.' as option_a, 'their chances of being laid off have greatly increased.' as option_b, 'they are more vulnerable to changes in family economics.' as option_c, 'they are deprived of unemployment or disability insurance.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text3' as text_num, 32 as question_number, 'As a result of President Bush''s reform, retired people may have' as question_text, 'a higher sense of security.' as option_a, 'less secured payments.' as option_b, 'less chance to invest.' as option_c, 'a guaranteed future.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text3' as text_num, 33 as question_number, 'According to the author, health-savings plans will' as question_text, 'help reduce the cost of healthcare.' as option_a, 'popularize among the middle class.' as option_b, 'compensate for the reduced pensions.' as option_c, 'increase the families'' investment risk.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text3' as text_num, 34 as question_number, 'It can be inferred from the last paragraph that' as question_text, 'financial risks tend to outweigh political risks.' as option_a, 'the middle class may face greater political challenges.' as option_b, 'financial problems may bring about political problems.' as option_c, 'financial responsibility is an indicator of political status.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following is the best title for this text?' as question_text, 'The Middle Class on the Alert' as option_a, 'The Middle Class on the Cliff' as option_b, 'The Middle Class in Conflict' as option_c, 'The Middle Class in Ruins' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text4' as text_num, 37 as question_number, 'According to Paragraph 2, some organizations check their systems to find out' as question_text, 'whether there is any weak point.' as option_a, 'what sort of data has been stolen.' as option_b, 'who is responsible for the leakage.' as option_c, 'how the potential spies can be located.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text4' as text_num, 38 as question_number, 'In bringing up the concept of GASP the author is making the point that' as question_text, 'shareholders'' interests should be properly attended to.' as option_a, 'information protection should be given due attention.' as option_b, 'businesses should enhance their level of accounting security.' as option_c, 'the market value of customer data should be emphasized.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text4' as text_num, 39 as question_number, 'According to Paragraph 4, what puzzles the author is that some bosses fail to' as question_text, 'see the link between trust and data protection.' as option_a, 'perceive the sensitivity of personal data.' as option_b, 'realize the high cost of data restoration.' as option_c, 'appreciate the economic value of trust.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2007 as year, 'Text4' as text_num, 40 as question_number, 'It can be inferred from Paragraph 5 that' as question_text, 'data leakage is more severe in Europe.' as option_a, 'FTC''s decision is essential to data security.' as option_b, 'California takes the lead in security legislation.' as option_c, 'legal penalty is a major solution to data leakage.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text1' as text_num, 21 as question_number, 'Which of the following is true according to the first two paragraphs?' as question_text, 'Women are biologically more vulnerable to stress.' as option_a, 'Women are still suffering much stress caused by men.' as option_b, 'Women are more experienced than men in coping with stress.' as option_c, 'Men and women show different inclinations when faced with stress.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text1' as text_num, 22 as question_number, 'Dr. Yehuda''s research suggests that women' as question_text, 'need extra doses of chemicals to handle stress.' as option_a, 'have limited capacity for tolerating stress.' as option_b, 'are more capable of avoiding stress.' as option_c, 'are exposed to more stress.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text1' as text_num, 23 as question_number, 'According to Paragraph 4, the stress women confront tends to be' as question_text, 'domestic and temporary.' as option_a, 'irregular and violent.' as option_b, 'durable and frequent.' as option_c, 'trivial and random.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Strain of Stress: No Way Out?' as option_a, 'Responses to Stress: Gender Difference' as option_b, 'Stress Analysis: What Chemicals Say' as option_c, 'Gender Inequality: Women Under Stress' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text2' as text_num, 26 as question_number, 'In the first paragraph, the author discusses' as question_text, 'the background information of journal editing.' as option_a, 'the publication routine of laboratory reports.' as option_b, 'the relations of authors with journal publishers.' as option_c, 'the traditional process of journal publication.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text2' as text_num, 27 as question_number, 'Which of the following is true of the OECD report?' as question_text, 'It criticizes government-funded research.' as option_a, 'It introduces an effective means of publication.' as option_b, 'It upsets profit-making journal publishers.' as option_c, 'It benefits scientific research considerably.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text2' as text_num, 28 as question_number, 'According to the text, online publication is significant in that' as question_text, 'it provides an easier access to scientific results.' as option_a, 'it brings huge profits to scientific researchers.' as option_b, 'it emphasizes the crucial role of scientific knowledge.' as option_c, 'it facilitates public investment in scientific research.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text2' as text_num, 29 as question_number, 'With the open-access publishing model, the author of a paper is required to' as question_text, 'cover the cost of its publication.' as option_a, 'subscribe to the journal publishing it.' as option_b, 'allow other online journals to use it freely.' as option_c, 'complete the peer-review before submission.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following best summarizes the main idea of the text?' as question_text, 'The Internet is posing a threat to publishers.' as option_a, 'A new mode of publication is emerging.' as option_b, 'Authors welcome the new channel for publication.' as option_c, 'Publication is rendered easier by online service.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text3' as text_num, 31 as question_number, 'Wilt Chamberlain is cited as an example to' as question_text, 'illustrate the change of height of NBA players.' as option_a, 'show the popularity of NBA players in the U.S..' as option_b, 'compare different generations of NBA players.' as option_c, 'assess the achievements of famous NBA players.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text3' as text_num, 32 as question_number, 'Which of the following plays a key role in body growth according to the text?' as question_text, 'Genetic modification.' as option_a, 'Natural environment.' as option_b, 'Living standards.' as option_c, 'Daily exercise.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text3' as text_num, 33 as question_number, 'On which of the following statements would the author most probably agree?' as question_text, 'Non-Americans add to the average height of the nation.' as option_a, 'Human height is conditioned by the upright posture.' as option_b, 'Americans are the tallest on average in the world.' as option_c, 'Larger babies tend to become taller in adulthood.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text3' as text_num, 34 as question_number, 'We learn from the last paragraph that in the near future' as question_text, 'the garment industry will reconsider the uniform size.' as option_a, 'the design of military uniforms will remain unchanged.' as option_b, 'genetic testing will be employed in selecting sportsmen.' as option_c, 'the existing data of human height will still be applicable.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text3' as text_num, 35 as question_number, 'The text intends to tell us that' as question_text, 'the change of human height follows a cyclic pattern.' as option_a, 'human height is becoming even more predictable.' as option_b, 'Americans have reached their genetic growth limit.' as option_c, 'the genetic pattern of Americans has altered.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text4' as text_num, 36 as question_number, 'George Washington''s dental surgery is mentioned to' as question_text, 'show the primitive medical practice in the past.' as option_a, 'demonstrate the cruelty of slavery in his days.' as option_b, 'stress the role of slaves in the U.S. history.' as option_c, 'reveal some unknown aspect of his life.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text4' as text_num, 37 as question_number, 'We may infer from the second paragraph that' as question_text, 'DNA technology has been widely applied to history research.' as option_a, 'in its early days the U.S. was confronted with delicate situations.' as option_b, 'historians deliberately made up some stories of Jefferson''s life.' as option_c, 'political compromises are easily found throughout the U.S. history.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text4' as text_num, 38 as question_number, 'What do we learn about Thomas Jefferson?' as question_text, 'His political view changed his attitude towards slavery.' as option_a, 'His status as a father made him free the child slaves.' as option_b, 'His attitude towards slavery was complex.' as option_c, 'His affair with a slave stained his prestige.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text4' as text_num, 39 as question_number, 'Which of the following is true according to the text?' as question_text, 'Some Founding Fathers benefit politically from slavery.' as option_a, 'Slaves in the old days did not have the right to vote.' as option_b, 'Slave owners usually had large savings accounts.' as option_c, 'Slavery was regarded as a peculiar institution.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2008 as year, 'Text4' as text_num, 40 as question_number, 'Washington''s decision to free slaves originated from his' as question_text, 'moral considerations.' as option_a, 'military experience.' as option_b, 'financial conditions.' as option_c, 'political stand.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text1' as text_num, 22 as question_number, 'Brain researchers have discovered that the formation of new habits can be' as question_text, 'predicted.' as option_a, 'regulated.' as option_b, 'traced.' as option_c, 'guided.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text1' as text_num, 24 as question_number, 'Dawna Markova would most probably agree that' as question_text, 'ideas are born of a relaxing mind.' as option_a, 'innovativeness could be taught.' as option_b, 'decisiveness derives from fantastic ideas.' as option_c, 'curiosity activates creative minds.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text1' as text_num, 25 as question_number, 'Ryan''s comments suggest that the practice of standardized testing' as question_text, 'prevents new habits from being formed.' as option_a, 'no longer emphasizes commonness.' as option_b, 'maintains the inherent American thinking mode.' as option_c, 'complies with the American belief system.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text2' as text_num, 26 as question_number, 'In paragraphs 1 and 2, the text shows PTK''s' as question_text, 'easy availability.' as option_a, 'flexibility in pricing.' as option_b, 'successful promotion.' as option_c, 'popularity with households.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text2' as text_num, 27 as question_number, 'PTK is used to' as question_text, 'locate one''s birth place.' as option_a, 'promote genetic research.' as option_b, 'identify parent-child kinship.' as option_c, 'choose children for adoption.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text2' as text_num, 28 as question_number, 'Skeptical observers believe that ancestry testing fails to' as question_text, 'trace distant ancestors.' as option_a, 'rebuild reliable bloodlines.' as option_b, 'fully use genetic information.' as option_c, 'achieve the claimed accuracy.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text2' as text_num, 29 as question_number, 'In the last paragraph, a problem commercial genetic testing faces is' as question_text, 'disorganized data collection.' as option_a, 'overlapping database building.' as option_b, 'excessive sample comparison.' as option_c, 'lack of patent evaluation.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text2' as text_num, 30 as question_number, 'An appropriate title for the text is most likely to be' as question_text, 'Fors and Againsts of DNA Testing.' as option_a, 'DNA Testing and Its Problems.' as option_b, 'DNA Testing Outside the Lab.' as option_c, 'Lies Behind DNA Testing.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text3' as text_num, 31 as question_number, 'The author holds in paragraph 1 that the importance of education in poor countries' as question_text, 'is subject to groundless doubts.' as option_a, 'has fallen victim of bias.' as option_b, 'is conventionally downgraded.' as option_c, 'has been overestimated.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text3' as text_num, 32 as question_number, 'It is stated in paragraph 1 that construction of a new education system' as question_text, 'challenges economists and politicians.' as option_a, 'takes efforts of generations.' as option_b, 'demands priority from the government.' as option_c, 'requires sufficient labor force.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text3' as text_num, 33 as question_number, 'A major difference between the Japanese and U.S. workforces is that' as question_text, 'the Japanese workforce is better disciplined.' as option_a, 'the Japanese workforce is more productive.' as option_b, 'the U.S. workforce has a better education.' as option_c, 'the U.S. workforce is more organized.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text3' as text_num, 34 as question_number, 'The author quotes the example of our ancestors to show that education emerged' as question_text, 'when people had enough time.' as option_a, 'prior to better ways of finding food.' as option_b, 'when people no longer went hungry.' as option_c, 'as a result of pressure on government.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text3' as text_num, 35 as question_number, 'According to the last paragraph, development of education' as question_text, 'results directly from competitive environments.' as option_a, 'does not depend on economic performance.' as option_b, 'follows improved productivity.' as option_c, 'cannot afford political changes.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text4' as text_num, 36 as question_number, 'The author notes that in the seventeenth-century New England' as question_text, 'Puritan tradition dominated political life.' as option_a, 'intellectual interests were encouraged.' as option_b, 'politics benefited much from intellectual endeavors.' as option_c, 'intellectual pursuits enjoyed a liberal environment.' as option_d, 'B' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 2/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2009 as year, 'Text4' as text_num, 37 as question_number, 'It is suggested in paragraph 2 that New Englanders' as question_text, 'experienced a comparatively peaceful early history.' as option_a, 'brought with them the culture of the Old World.' as option_b, 'paid little attention to southern intellectual life.' as option_c, 'were obsessed with religious innovations.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text4' as text_num, 38 as question_number, 'The early ministers and political leaders in Massachusetts Bay' as question_text, 'were famous in the New World for their writings.' as option_a, 'gained increasing importance in religious affairs.' as option_b, 'abandoned high positions before coming to the New World.' as option_c, 'created a new intellectual atmosphere in New England.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text4' as text_num, 39 as question_number, 'The story of John Dane shows that less well-educated New Englanders were often' as question_text, 'influenced by superstitions.' as option_a, 'troubled with religious beliefs.' as option_b, 'puzzled by church sermons.' as option_c, 'frustrated with family earnings.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2009 as year, 'Text4' as text_num, 40 as question_number, 'The text suggests that early settlers in New England' as question_text, 'were mostly engaged in political activities.' as option_a, 'were motivated by an illusory prospect.' as option_b, 'came from different intellectual backgrounds.' as option_c, 'left few formal records for later reference.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text1' as text_num, 21 as question_number, 'It is indicated in Paragraphs 1 and 2 that' as question_text, 'arts criticism has disappeared from big-city newspapers.' as option_a, 'English-language newspapers used to carry more arts reviews.' as option_b, 'high-quality newspapers retain a large body of readers.' as option_c, 'young readers doubt the suitability of criticism on dailies.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text1' as text_num, 22 as question_number, 'Newspaper reviews in England before World War II were characterized by' as question_text, 'free themes.' as option_a, 'casual style.' as option_b, 'elaborate layout.' as option_c, 'radical viewpoints.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text1' as text_num, 23 as question_number, 'Which of the following would Shaw and Newman most probably agree on?' as question_text, 'It is writers'' duty to fulfill journalistic goals.' as option_a, 'It is contemptible for writers to be journalists.' as option_b, 'Writers are likely to be tempted into journalism.' as option_c, 'Not all writers are capable of journalistic writing.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text1' as text_num, 24 as question_number, 'What can be learned about Cardus according to the last two paragraphs?' as question_text, 'His music criticism may not appeal to readers today.' as option_a, 'His reputation as a music critic has long been in dispute.' as option_b, 'His style caters largely to modern specialists.' as option_c, 'His writings fail to follow the amateur tradition.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text1' as text_num, 25 as question_number, 'What would be the best title for the text?' as question_text, 'Newspapers of the Good Old Days' as option_a, 'The Lost Horizon in Newspapers' as option_b, 'Mournful Decline of Journalism' as option_c, 'Prominent Critics in Memory' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text2' as text_num, 26 as question_number, 'Business-method patents have recently aroused concern because of' as question_text, 'their limited value to business.' as option_a, 'their connection with asset allocation.' as option_b, 'the possible restriction on their granting.' as option_c, 'the controversy over authorization.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text2' as text_num, 27 as question_number, 'Which of the following is true of the Bilski case?' as question_text, 'Its ruling complies with the court decisions.' as option_a, 'It involves a very big business transaction.' as option_b, 'It has been dismissed by the Federal Circuit.' as option_c, 'It may change the legal practices in the U.S..' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text2' as text_num, 29 as question_number, 'We learn from the last two paragraphs that business-method patents' as question_text, 'are immune to legal challenges.' as option_a, 'are often unnecessarily issued.' as option_b, 'lower the esteem for patent holders.' as option_c, 'increase the incidence of risks.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the subject of the text?' as question_text, 'A looming threat to business-method patents.' as option_a, 'Protection for business-method patent holders.' as option_b, 'A legal case regarding business-method patents.' as option_c, 'A prevailing trend against business-method patents.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text3' as text_num, 31 as question_number, 'By citing the book The Tipping Point, the author intends to' as question_text, 'analyze the consequences of social epidemics.' as option_a, 'discuss influentials'' function in spreading ideas.' as option_b, 'exemplify people''s intuitive response to social epidemics.' as option_c, 'describe the essential characteristics of influentials.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text3' as text_num, 33 as question_number, 'What the researchers have observed recently shows that' as question_text, 'the power of influence goes with social interactions.' as option_a, 'interpersonal links can be enhanced through the media.' as option_b, 'influentials have more channels to reach the public.' as option_c, 'most celebrities enjoy wide media attention.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text3' as text_num, 35 as question_number, 'What is the essential element in the dynamics of social influence?' as question_text, 'The eagerness to be accepted.' as option_a, 'The impulse to influence others.' as option_b, 'The readiness to be influenced.' as option_c, 'The inclination to rely on others.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text4' as text_num, 36 as question_number, 'Bankers complained that they were forced to' as question_text, 'follow unfavorable asset evaluation rules.' as option_a, 'collect payments from third parties.' as option_b, 'cooperate with the price managers.' as option_c, 'reevaluate some of their assets.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text4' as text_num, 37 as question_number, 'According to the author, the rule changes of the FASB may result in' as question_text, 'the diminishing role of management.' as option_a, 'the revival of the banking system.' as option_b, 'the banks'' long-term asset losses.' as option_c, 'the weakening of its independence.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text4' as text_num, 38 as question_number, 'According to Paragraph 4, McCreevy objects to the IASB''s attempt to' as question_text, 'keep separate accounting standards.' as option_a, 'escape the influence of politics.' as option_b, 'act on its own in rule-making.' as option_c, 'take gradual measures in reform.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text4' as text_num, 39 as question_number, 'The author thinks the banks were "on the wrong planet" in that they' as question_text, 'misinterpreted market price indicators.' as option_a, 'exaggerated the real value of their assets.' as option_b, 'neglected the likely existence of bad debts.' as option_c, 'denied booking losses in their sale of assets.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2010 as year, 'Text4' as text_num, 40 as question_number, 'The author''s attitude towards standard-setters is one of' as question_text, 'satisfaction.' as option_a, 'skepticism.' as option_b, 'objectiveness.' as option_c, 'sympathy.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text1' as text_num, 21 as question_number, 'We learn from Para. 1 that Gilbert''s appointment has' as question_text, 'incurred criticism.' as option_a, 'raised suspicion.' as option_b, 'received acclaim.' as option_c, 'aroused curiosity.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text1' as text_num, 22 as question_number, 'Tommasini regards Gilbert as an artist who is' as question_text, 'influential.' as option_a, 'modest.' as option_b, 'respectable.' as option_c, 'talented.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text1' as text_num, 23 as question_number, 'The author believes that the devoted concertgoers' as question_text, 'ignore the expenses of live performances.' as option_a, 'reject most kinds of recorded performances.' as option_b, 'exaggerate the variety of live performances.' as option_c, 'overestimate the value of live performances.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text1' as text_num, 24 as question_number, 'According to the text, which of the following is true of recordings?' as question_text, 'They are often inferior to live concerts in quality.' as option_a, 'They are easily accessible to the general public.' as option_b, 'They help improve the quality of music.' as option_c, 'They have only covered masterpieces.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text1' as text_num, 25 as question_number, 'Regarding Gilbert''s role in revitalizing the Philharmonic, the author feels' as question_text, 'doubtful.' as option_a, 'enthusiastic.' as option_b, 'confident.' as option_c, 'puzzled.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text2' as text_num, 26 as question_number, 'When McGee announced his departure, his manner can best be described as being' as question_text, 'arrogant.' as option_a, 'frank.' as option_b, 'self-centered.' as option_c, 'impulsive.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text2' as text_num, 27 as question_number, 'According to Paragraph 2, senior executives'' quitting may be spurred by' as question_text, 'their expectation of better financial status.' as option_a, 'their need to reflect on their private life.' as option_b, 'their strained relations with the boards.' as option_c, 'their pursuit of new career goals.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text2' as text_num, 29 as question_number, 'It can be inferred from the last paragraph that' as question_text, 'top performers used to cling to their posts.' as option_a, 'loyalty of top performers is getting out-dated.' as option_b, 'top performers care more about reputations.' as option_c, 'it''s safer to stick to the traditional rules.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following is the best title for the text?' as question_text, 'CEOs: Where to Go?' as option_a, 'CEOs: All the Way Up?' as option_b, 'Top Managers Jump without a Net' as option_c, 'The Only Way Out for Top Performers' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text3' as text_num, 32 as question_number, 'According to Paragraph 2, sold media feature' as question_text, 'a safe business environment.' as option_a, 'random competition.' as option_b, 'strong user traffic.' as option_c, 'flexibility in organization.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text3' as text_num, 33 as question_number, 'The author indicates in Paragraph 3 that earned media' as question_text, 'invite constant conflicts with passionate consumers.' as option_a, 'can be used to produce negative effects in marketing.' as option_b, 'may be responsible for fiercer competition.' as option_c, 'deserve all the negative comments about them.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text3' as text_num, 34 as question_number, 'Toyota Motor''s experience is cited as an example of' as question_text, 'responding effectively to hijacked media.' as option_a, 'persuading customers into boycotting products.' as option_b, 'cooperating with supportive consumers.' as option_c, 'taking advantage of hijacked media.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following is the text mainly about?' as question_text, 'Alternatives to conventional paid media.' as option_a, 'Conflict between hijacked and earned media.' as option_b, 'Dominance of hijacked media.' as option_c, 'Popularity of owned media.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text4' as text_num, 36 as question_number, 'Jennifer Senior suggests in her article that raising a child can bring' as question_text, 'temporary delight.' as option_a, 'great enjoyment.' as option_b, 'constant stress.' as option_c, 'enduring satisfaction.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text4' as text_num, 37 as question_number, 'We learn from Paragraph 2 that' as question_text, 'celebrity moms are a permanent source for gossip.' as option_a, 'single mothers with babies deserve greater attention.' as option_b, 'news about pregnant celebrities is entertaining.' as option_c, 'having children is highly valued by the public.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text4' as text_num, 38 as question_number, 'It is suggested in Paragraph 3 that childless folks' as question_text, 'are constantly reminded of their childlessness.' as option_a, 'are largely ignored by the media.' as option_b, 'are virtually inferior to parents.' as option_c, 'are less likely to be satisfied with their life.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text4' as text_num, 39 as question_number, 'According to Paragraph 4, the message conveyed by celebrity magazines is' as question_text, 'soothing.' as option_a, 'ambiguous.' as option_b, 'compensatory.' as option_c, 'misleading.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2011 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following can be inferred from the last paragraph?' as question_text, 'Having children contributes little to the glamour of celebrity moms.' as option_a, 'Celebrity moms have influenced our attitude towards child rearing.' as option_b, 'Having children intensifies our dissatisfaction with life.' as option_c, 'We sometimes neglect the happiness from child rearing.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text1' as text_num, 21 as question_number, 'According to the first paragraph, peer pressure often emerges as' as question_text, 'a supplement to the social cure.' as option_a, 'a stimulus to group dynamics.' as option_b, 'an obstacle to social progress.' as option_c, 'a cause of undesirable behaviors.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text1' as text_num, 22 as question_number, 'Rosenberg holds that public advocates should' as question_text, 'recruit professional advertisers.' as option_a, 'learn from advertisers'' experience.' as option_b, 'stay away from commercial advertisers.' as option_c, 'recognize the limitations of advertisements.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text1' as text_num, 23 as question_number, 'In the author''s view, Rosenberg''s book fails to' as question_text, 'adequately probe social and biological factors.' as option_a, 'effectively evade the flaws of the social cure.' as option_b, 'illustrate the functions of state funding.' as option_c, 'produce a long-lasting social effect.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text1' as text_num, 24 as question_number, 'Paragraph 5 shows that our imitation of behaviors' as question_text, 'is harmful to our networks of friends.' as option_a, 'will mislead behavioral studies.' as option_b, 'occurs without our realizing it.' as option_c, 'can produce negative health habits.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text1' as text_num, 25 as question_number, 'The author suggests in the last paragraph that the effect of peer pressure is' as question_text, 'harmful.' as option_a, 'desirable.' as option_b, 'profound.' as option_c, 'questionable.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text2' as text_num, 27 as question_number, 'By entering into the 2002 agreement, Entergy intended to' as question_text, 'obtain protection from Vermont regulators.' as option_a, 'seek favor from the federal legislature.' as option_b, 'acquire an extension of its business license.' as option_c, 'get permission to purchase a power plant.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text2' as text_num, 28 as question_number, 'According to Paragraph 4, Entergy seems to have problems with its' as question_text, 'managerial practices.' as option_a, 'technical innovativeness.' as option_b, 'financial goals.' as option_c, 'business vision.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text2' as text_num, 29 as question_number, 'In the author''s view, the Vermont case will test' as question_text, 'Entergy''s capacity to fulfill all its promises.' as option_a, 'the nature of states'' patchwork regulations.' as option_b, 'the federal authority over nuclear issues.' as option_c, 'the limits of states'' power over nuclear issues.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text2' as text_num, 30 as question_number, 'It can be inferred from the last paragraph that' as question_text, 'Entergy''s business elsewhere might be affected.' as option_a, 'the authority of the NRC will be defied.' as option_b, 'Entergy will withdraw its Plymouth application.' as option_c, 'Vermont''s reputation might be damaged.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text3' as text_num, 31 as question_number, 'According to the first paragraph, the process of discovery is characterized by its' as question_text, 'uncertainty and complexity.' as option_a, 'misconception and deceptiveness.' as option_b, 'logicality and objectivity.' as option_c, 'systematicness and regularity.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text3' as text_num, 32 as question_number, 'It can be inferred from Paragraph 2 that credibility process requires' as question_text, 'strict inspection.' as option_a, 'shared efforts.' as option_b, 'individual wisdom.' as option_c, 'persistent innovation.' as option_d, 'B' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 3/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2012 as year, 'Text3' as text_num, 33 as question_number, 'Paragraph 3 shows that a discovery claim becomes credible after it' as question_text, 'has attracted the attention of the general public.' as option_a, 'has been examined by the scientific community.' as option_b, 'has received recognition from editors and reviewers.' as option_c, 'has been frequently quoted by peer scientists.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text3' as text_num, 34 as question_number, 'Albert Szent-Gyorgyi would most likely agree that' as question_text, 'scientific claims will survive challenges.' as option_a, 'discoveries today inspire future research.' as option_b, 'efforts to make discoveries are justified.' as option_c, 'scientific work calls for a critical mind.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title of the text?' as question_text, 'Novelty as an Engine of Scientific Development.' as option_a, 'Collective Scrutiny in Scientific Discovery.' as option_b, 'Evolution of Credibility in Doing Science.' as option_c, 'Challenge to Credibility at the Gate to Science.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text4' as text_num, 36 as question_number, 'It can be learned from the first paragraph that' as question_text, 'Teamsters still have a large body of members.' as option_a, 'Jimmy Hoffa used to work as a civil servant.' as option_b, 'unions have enlarged their public-sector membership.' as option_c, 'the government has improved its relationship with unionists.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text4' as text_num, 37 as question_number, 'Which of the following is true of Paragraph 2?' as question_text, 'Public-sector unions are prudent in taking actions.' as option_a, 'Education is required for public-sector union membership.' as option_b, 'Labor Party has long been fighting against public-sector unions.' as option_c, 'Public-sector unions seldom get in trouble for their actions.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text4' as text_num, 38 as question_number, 'It can be learned from Paragraph 4 that the income in the state sector is' as question_text, 'illegally secured.' as option_a, 'indirectly augmented.' as option_b, 'excessively increased.' as option_c, 'fairly adjusted.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text4' as text_num, 39 as question_number, 'The example of the unions in Wisconsin shows that unions' as question_text, 'often run against the current political system.' as option_a, 'can change people''s political attitudes.' as option_b, 'may be a barrier to public-sector reforms.' as option_c, 'are dominant in the government.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2012 as year, 'Text4' as text_num, 40 as question_number, 'John Donahue''s attitude towards the public-sector system is one of' as question_text, 'disapproval.' as option_a, 'appreciation.' as option_b, 'tolerance.' as option_c, 'indifference.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text1' as text_num, 21 as question_number, 'Priestly criticizes her assistant for her' as question_text, 'lack of imagination.' as option_a, 'poor bargaining skill.' as option_b, 'obsession with high fashion.' as option_c, 'insensitivity to fashion.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text1' as text_num, 22 as question_number, 'According to Cline, mass-market labels urge consumers to' as question_text, 'combat unnecessary waste.' as option_a, 'shop for their garments more frequently.' as option_b, 'resist the influence of advertisements.' as option_c, 'shut out the feverish fashion world.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text1' as text_num, 24 as question_number, 'Which of the following can be inferred from the last paragraph?' as question_text, 'Vanity has more often been found in idealists.' as option_a, 'The fast-fashion industry ignores sustainability.' as option_b, 'People are more interested in unaffordable garments.' as option_c, 'Pricing is vital to environment-friendly purchasing.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text1' as text_num, 25 as question_number, 'What is the subject of the text?' as question_text, 'Satire on an extravagant lifestyle.' as option_a, 'Challenge to a high-fashion myth.' as option_b, 'Criticism of the fast-fashion industry.' as option_c, 'Exposure of a mass-market secret.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text2' as text_num, 28 as question_number, 'Bob Liodice holds that setting DNT as a default' as question_text, 'may cut the number of junk ads.' as option_a, 'fails to affect the ad industry.' as option_b, 'will not benefit consumers.' as option_c, 'goes against human nature.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text2' as text_num, 29 as question_number, 'Which of the following is true according to Paragraph 6?' as question_text, 'DNT may not serve its intended purpose.' as option_a, 'Advertisers are willing to implement DNT.' as option_b, 'DNT is losing its popularity among consumers.' as option_c, 'Advertisers are obliged to offer behavioral ads.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text2' as text_num, 30 as question_number, 'The author''s attitude towards what Brendon Lynch said in his blog is one of' as question_text, 'indulgence.' as option_a, 'understanding.' as option_b, 'appreciation.' as option_c, 'skepticism.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text3' as text_num, 31 as question_number, 'Our vision of the future used to be inspired by' as question_text, 'our desire for lives of fulfillment.' as option_a, 'our faith in science and technology.' as option_b, 'our awareness of potential risks.' as option_c, 'our belief in equal opportunity.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text3' as text_num, 33 as question_number, 'Which of the following is true according to Paragraph 5?' as question_text, 'The interest in science fiction is on the rise.' as option_a, 'Arc helps limit the scope of futurological studies.' as option_b, 'Technology offers solutions to social problems.' as option_c, 'Our immediate future is hard to conceive.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text3' as text_num, 34 as question_number, 'To ensure the future of mankind, it is crucial to' as question_text, 'explore our planet''s abundant resources.' as option_a, 'adopt an optimistic view of the world.' as option_b, 'draw on our experience from the past.' as option_c, 'curb our ambition to reshape history.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Uncertainty about Our Future' as option_a, 'Evolution of the Human Species' as option_b, 'The Ever-bright Prospects of Mankind' as option_c, 'Science, Technology and Humanity' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text4' as text_num, 36 as question_number, 'Three provisions of Arizona''s plan were overturned because they' as question_text, 'overstepped the authority of federal immigration law.' as option_a, 'disturbed the power balance between different states.' as option_b, 'deprived the federal police of Constitutional powers.' as option_c, 'contradicted both the federal and state policies.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text4' as text_num, 37 as question_number, 'On which of the following did the Justices agree, according to Paragraph 4?' as question_text, 'States'' independence from federal immigration law.' as option_a, 'Federal officers'' duty to withhold immigrants'' information.' as option_b, 'States'' legitimate role in immigration enforcement.' as option_c, 'Congress''s intervention in immigration enforcement.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text4' as text_num, 38 as question_number, 'It can be inferred from Paragraph 5 that the Alien and Sedition Acts' as question_text, 'violated the Constitution.' as option_a, 'stood in favor of the states.' as option_b, 'supported the federal statute.' as option_c, 'undermined the states'' interests.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text4' as text_num, 39 as question_number, 'The White House claims that its power of enforcement' as question_text, 'outweighs that held by the states.' as option_a, 'is established by federal statutes.' as option_b, 'is dependent on the states'' support.' as option_c, 'rarely goes against state laws.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2013 as year, 'Text4' as text_num, 40 as question_number, 'What can be learned from the last paragraph?' as question_text, 'Immigration issues are usually decided by Congress.' as option_a, 'The Administration is dominant over immigration issues.' as option_b, 'Justices wanted to strengthen its coordination with Congress.' as option_c, 'Justices intended to check the power of the Administration.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text1' as text_num, 21 as question_number, 'George Osborne''s scheme was intended to' as question_text, 'provide the unemployed with easier access to benefits.' as option_a, 'encourage jobseekers'' active engagement in job seeking.' as option_b, 'motivate the unemployed to report voluntarily.' as option_c, 'guarantee jobseekers'' legitimate right to benefits.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text1' as text_num, 23 as question_number, 'What prompted the chancellor to develop his scheme?' as question_text, 'A desire to secure a better life for all.' as option_a, 'An eagerness to protect the unemployed.' as option_b, 'An urge to be generous to the claimants.' as option_c, 'A passion to ensure fairness for taxpayers.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text1' as text_num, 24 as question_number, 'According to Paragraph 3, being unemployed makes one feel' as question_text, 'uneasy.' as option_a, 'enraged.' as option_b, 'insulted.' as option_c, 'guilty.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text1' as text_num, 25 as question_number, 'To which of the following would the author most probably agree?' as question_text, 'The British welfare system indulges jobseekers'' laziness.' as option_a, 'Osborne''s reforms will reduce the risk of unemployment.' as option_b, 'The jobseekers'' allowance has met their actual needs.' as option_c, 'Unemployment benefits should not be made conditional.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text2' as text_num, 26 as question_number, 'A lot of students take up law as their profession due to' as question_text, 'the growing demand from clients.' as option_a, 'the increasing pressure of inflation.' as option_b, 'the prospect of working in big firms.' as option_c, 'the attraction of financial rewards.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text2' as text_num, 27 as question_number, 'Which of the following adds to the costs of legal education in most American states?' as question_text, 'Higher tuition fees for undergraduate studies.' as option_a, 'Admissions approval from the bar association.' as option_b, 'Pursuing a bachelor''s degree in another major.' as option_c, 'Receiving training by professional associations.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text2' as text_num, 28 as question_number, 'Hindrance to the reform of the legal system originates from' as question_text, 'lawyers'' and clients'' strong resistance.' as option_a, 'the rigid bodies governing the profession.' as option_b, 'the stern exam for would-be lawyers.' as option_c, 'non-professionals'' sharp criticism.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text2' as text_num, 30 as question_number, 'In this text, the author mainly discusses' as question_text, 'flawed ownership of America''s law firms and its causes.' as option_a, 'the factors that help make a successful lawyer in America.' as option_b, 'a problem in America''s legal profession and solutions to it.' as option_c, 'the role of undergraduate studies in America''s legal education.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text3' as text_num, 31 as question_number, 'The Fundamental Physics Prize is seen as' as question_text, 'a symbol of the entrepreneurs'' wealth.' as option_a, 'a possible replacement of the Nobel Prizes.' as option_b, 'an example of bankers'' investments.' as option_c, 'a handsome reward for researchers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text3' as text_num, 32 as question_number, 'The critics think that the new awards will most benefit' as question_text, 'the profit-oriented scientists.' as option_a, 'the founders of the new awards.' as option_b, 'the discovery-based research.' as option_c, 'the achievement-oriented system.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text3' as text_num, 33 as question_number, 'The discovery of the Higgs boson is a typical case which' as question_text, 'involves controversies over the recipients'' status.' as option_a, 'demonstrates the joint effort of modern researchers.' as option_b, 'shows legitimate concerns over the new prizes.' as option_c, 'illustrates the demonstration of research findings.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text3' as text_num, 34 as question_number, 'According to Paragraph 4, which of the following is true of the Nobels?' as question_text, 'Their endurance has done justice to them.' as option_a, 'Their legitimacy has long been in dispute.' as option_b, 'They are the most representative of achievement.' as option_c, 'History has never cast doubt on them.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text3' as text_num, 35 as question_number, 'The author believes that the new awards are' as question_text, 'acceptable despite the criticism.' as option_a, 'harmful to the culture of research.' as option_b, 'subject to undesirable changes.' as option_c, 'unworthy of public attention.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text4' as text_num, 36 as question_number, 'According to Paragraph 1, what is the author''s attitude toward the AAAS''s report?' as question_text, 'Critical.' as option_a, 'Appreciative.' as option_b, 'Contemptuous.' as option_c, 'Tolerant.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text4' as text_num, 37 as question_number, 'Influential figures in the Congress required that the AAAS report on how to' as question_text, 'retain people''s interest in liberal education.' as option_a, 'define the government''s role in education.' as option_b, 'keep a leading position in liberal education.' as option_c, 'safeguard individuals'' rights to education.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text4' as text_num, 38 as question_number, 'According to Paragraph 3, the report suggests' as question_text, 'an exclusive study of American history.' as option_a, 'a greater emphasis on theoretical subjects.' as option_b, 'the application of emerging technologies.' as option_c, 'funding for the study of foreign languages.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2014 as year, 'Text4' as text_num, 39 as question_number, 'The author implies in Paragraph 5 that professors are' as question_text, 'supportive of free markets.' as option_a, 'cautious about intellectual investigation.' as option_b, 'conservative about public policy.' as option_c, 'biased against classical liberal ideas.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text1' as text_num, 21 as question_number, 'According to the first two Paragraphs, King Juan Carlos of Spain' as question_text, 'used to enjoy high public support.' as option_a, 'was unpopular among European royals.' as option_b, 'ended his reign in embarrassment.' as option_c, 'eased his relationship with his rivals.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text1' as text_num, 22 as question_number, 'Monarchs are kept as heads of state in Europe mostly' as question_text, 'owing to their undoubted and respectable status.' as option_a, 'to achieve a balance between tradition and reality.' as option_b, 'to give voters more public figures to look up to.' as option_c, 'due to their everlasting political embodiment.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text1' as text_num, 23 as question_number, 'Which of the following is shown to be odd, according to Paragraph 4?' as question_text, 'Aristocrats'' excessive reliance on inherited wealth.' as option_a, 'The role of the nobility in modern democracies.' as option_b, 'The simple lifestyle of the aristocratic families.' as option_c, 'The nobility''s adherence to their privileges.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text1' as text_num, 24 as question_number, 'The British royals "have most to fear" because Charles' as question_text, 'takes a rough line on political issues.' as option_a, 'fails to change his lifestyle as advised.' as option_b, 'takes republicans as his potential allies.' as option_c, 'fails to adapt himself to his future role.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following is the best title of the text?' as question_text, 'Carlos, Glory and Disgrace Combined' as option_a, 'Charles, Anxious to Succeed to the Throne' as option_b, 'Carlos, a Lesson for All European Monarchs' as option_c, 'Charles, Slow to React to the Coming Threats' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text2' as text_num, 26 as question_number, 'The Supreme Court will work out whether, during an arrest, it is legitimate to' as question_text, 'search for suspects'' mobile phones without a warrant.' as option_a, 'check suspects'' phone contents without being authorized.' as option_b, 'prevent suspects from deleting their phone contents.' as option_c, 'prohibit suspects from using their mobile phones.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text2' as text_num, 27 as question_number, 'The author''s attitude toward California''s argument is one of' as question_text, 'disapproval.' as option_a, 'indifference.' as option_b, 'tolerance.' as option_c, 'cautiousness.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text2' as text_num, 28 as question_number, 'The author believes that exploring one''s phone contents is comparable to' as question_text, 'getting into one''s residence.' as option_a, 'handling one''s historical records.' as option_b, 'scanning one''s correspondences.' as option_c, 'going through one''s wallet.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text2' as text_num, 29 as question_number, 'In Paragraph 5 and 6, the author shows his concern that' as question_text, 'principles are hard to be clearly expressed.' as option_a, 'the court is giving police less room for action.' as option_b, 'citizens'' privacy is not effectively protected.' as option_c, 'phones are used to store sensitive information.' as option_d, 'C' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 4/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2015 as year, 'Text2' as text_num, 30 as question_number, 'Orin Kerr''s comparison is quoted to indicate that' as question_text, 'the Constitution should be implemented flexibly.' as option_a, 'new technology requires reinterpretation of the Constitution.' as option_b, 'California''s argument violates principles of the Constitution.' as option_c, 'principles of the Constitution should never be altered.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text3' as text_num, 31 as question_number, 'It can be learned from Paragraph 1 that' as question_text, 'Science intends to simplify its peer-review process.' as option_a, 'journals are strengthening their statistical checks.' as option_b, 'few journals are blamed for mistakes in data analysis.' as option_c, 'lack of data analysis is common in research projects.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text3' as text_num, 32 as question_number, 'The phrase "flagged up" (Para. 2) is closest in meaning to' as question_text, 'found.' as option_a, 'revised.' as option_b, 'marked.' as option_c, 'stored.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text3' as text_num, 33 as question_number, 'Giovanni Parmigiani believes that the establishment of the SBoRE may' as question_text, 'pose a threat to all its peers.' as option_a, 'meet with strong opposition.' as option_b, 'increase Science''s circulation.' as option_c, 'set an example for other journals.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text3' as text_num, 34 as question_number, 'David Vaux holds that what Science is doing now' as question_text, 'adds to researchers'' workload.' as option_a, 'diminishes the role of reviewers.' as option_b, 'has room for further improvement.' as option_c, 'is to fail in the foreseeable future.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following is the best title of the text?' as question_text, 'Science Joins Push to Screen Statistics in Papers' as option_a, 'Professional Statisticians Deserve More Respect' as option_b, 'Data Analysis Finds Its Way onto Editors'' Desks' as option_c, 'Statisticians Are Coming Back with Science' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text4' as text_num, 36 as question_number, 'According to the first two paragraphs, Elisabeth was upset by' as question_text, 'the consequences of the current sorting mechanism.' as option_a, 'companies'' financial loss due to immoral practices.' as option_b, 'governmental ineffectiveness on moral issues.' as option_c, 'the wide misuse of integrity among institutions.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text4' as text_num, 37 as question_number, 'It can be inferred from Paragraph 3 that' as question_text, 'Glenn Mulcaire may deny phone hacking as a crime.' as option_a, 'more journalists may be found guilty of phone hacking.' as option_b, 'Andy Coulson should be held innocent of the charge.' as option_c, 'phone hacking will be accepted on certain occasions.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text4' as text_num, 38 as question_number, 'The author believes that Rebekah Brooks''s defence' as question_text, 'revealed a cunning personality.' as option_a, 'centered on trivial issues.' as option_b, 'was hardly convincing.' as option_c, 'was part of a conspiracy.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text4' as text_num, 39 as question_number, 'The author holds that the current collective doctrine shows' as question_text, 'generally distorted values.' as option_a, 'unfair wealth distribution.' as option_b, 'a marginalized lifestyle.' as option_c, 'a rigid moral code.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2015 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following is suggested in the last paragraph?' as question_text, 'The quality of writings is of primary importance.' as option_a, 'Common humanity is central to news reporting.' as option_b, 'Moral awareness matters in editing a newspaper.' as option_c, 'Journalists need stricter industrial regulations.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text1' as text_num, 21 as question_number, 'According to the first paragraph, what would happen in France?' as question_text, 'Physical beauty would be redefined.' as option_a, 'New runways would be constructed.' as option_b, 'Websites about dieting would thrive.' as option_c, 'The fashion industry would decline.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text1' as text_num, 23 as question_number, 'Which of the following is true of the fashion industry?' as question_text, 'The French measures have already failed.' as option_a, 'New standards are being set in Denmark.' as option_b, 'Models are no longer under peer pressure.' as option_c, 'Its inherent problems are getting worse.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text1' as text_num, 24 as question_number, 'A designer is most likely to be rejected by CFW for' as question_text, 'setting a high age threshold for models.' as option_a, 'caring too much about models'' character.' as option_b, 'showing little concern for health factors.' as option_c, 'pursuing perfect physical conditions.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following may be the best title of the text?' as question_text, 'A Challenge to the Fashion Industry''s Body Ideals' as option_a, 'Just Another Round of Struggle for Beauty' as option_b, 'A Dilemma for the Starving Models in France' as option_c, 'The Great Threats to the Fashion Industry' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text2' as text_num, 26 as question_number, 'Britain''s public sentiment about the countryside' as question_text, 'has brought much benefit to the NHS.' as option_a, 'didn''t start till the Shakespearean age.' as option_b, 'is fully backed by the royal family.' as option_c, 'is not well reflected in politics.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text2' as text_num, 27 as question_number, 'According to Paragraph 2, the achievements of the National Trust are now being' as question_text, 'gradually destroyed.' as option_a, 'effectively reinforced.' as option_b, 'properly protected.' as option_c, 'largely overshadowed.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text2' as text_num, 28 as question_number, 'Which of the following can be inferred from Paragraph 3?' as question_text, 'Ukip may gain from its support for rural conservation.' as option_a, 'The Conservatives may abandon ''off-plan'' building.' as option_b, 'The Liberal Democrats are losing political influence.' as option_c, 'Labour is under attack for opposing development.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text2' as text_num, 29 as question_number, 'The author holds that George Osborne''s preference' as question_text, 'reveals a strong prejudice against urban areas.' as option_a, 'shows his disregard for the character of rural areas.' as option_b, 'stresses the necessity of easing the housing crisis.' as option_c, 'highlights his firm stand against lobby pressure.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text2' as text_num, 30 as question_number, 'In the last paragraph, the author shows his appreciation of' as question_text, 'the town-and-country planning in Britain.' as option_a, 'the enviable urban lifestyle in Britain.' as option_b, 'the size of population in Britain.' as option_c, 'the political life in today''s Britain.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text3' as text_num, 31 as question_number, 'The author views Milton Friedman''s statement about CSR with' as question_text, 'uncertainty.' as option_a, 'skepticism.' as option_b, 'approval.' as option_c, 'tolerance.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text3' as text_num, 32 as question_number, 'According to Paragraph 2, CSR helps a company by' as question_text, 'guarding it against malpractices.' as option_a, 'protecting it from being defamed.' as option_b, 'winning trust from consumers.' as option_c, 'raising the quality of its products.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text3' as text_num, 34 as question_number, 'When prosecutors evaluate a case, a company''s CSR record' as question_text, 'comes across as reliable evidence.' as option_a, 'has an impact on their decision.' as option_b, 'increases the chance of being penalized.' as option_c, 'constitutes part of the investigation.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following is true of CSR, according to the last paragraph?' as question_text, 'The necessary amount of companies'' spending on it is unknown.' as option_a, 'Companies'' financial capacity for it has been overestimated.' as option_b, 'Its negative effects on businesses are often overlooked.' as option_c, 'It has brought much benefit to the banking industry.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text4' as text_num, 36 as question_number, 'The New York Times is considering ending its print edition partly due to' as question_text, 'the pressure from its investors.' as option_a, 'the complaints from its readers.' as option_b, 'the high cost of operation.' as option_c, 'the increasing online ad sales.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text4' as text_num, 37 as question_number, 'Peretti suggests that, in face of the present situation, the Times should' as question_text, 'make strategic adjustments.' as option_a, 'end the print edition for good.' as option_b, 'seek new sources of readership.' as option_c, 'aim for efficient management.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text4' as text_num, 39 as question_number, 'Peretti believes that, in a changing world,' as question_text, 'traditional luxuries can stay unaffected.' as option_a, 'aggressiveness better meets challenges.' as option_b, 'cautiousness facilitates problem-solving.' as option_c, 'legacy businesses are becoming outdated.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2016 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title of the text?' as question_text, 'Make Your Print Newspaper a Luxury Good' as option_a, 'Keep Your Newspapers Forever in Fashion' as option_b, 'Cherish the Newspaper Still in Your Hand' as option_c, 'Shift to Online Newspapers All at Once' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text1' as text_num, 21 as question_number, 'The crash of Egypt Air Flight 804 is mentioned to' as question_text, 'stress the urgency to strengthen security worldwide.' as option_a, 'highlight the necessity of upgrading major US airports.' as option_b, 'explain Americans'' tolerance of current security checks.' as option_c, 'emphasize the importance of privacy protection.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text1' as text_num, 22 as question_number, 'Which of the following contributes to long waits at major airport?' as question_text, 'New restrictions on carry-on bags.' as option_a, 'The declining efficiency of the TSA.' as option_b, 'An increase in the number of travelers.' as option_c, 'Frequent unexpected secret checks.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text1' as text_num, 24 as question_number, 'One problem with the PreCheck program is' as question_text, 'a dramatic reduction of its scale.' as option_a, 'its wrongly-directed implementation.' as option_b, 'the government''s reluctance to back it.' as option_c, 'an unreasonable price for enrollment.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Less Screening for More Safety' as option_a, 'PreCheck — a Belated Solution' as option_b, 'Getting Stuck in Security Lines' as option_c, 'Underused PreCheck Lanes' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text2' as text_num, 26 as question_number, 'Queen Liliuokalani''s remark in Paragraph 1 indicates' as question_text, 'its conservative view on the historical role of astronomy.' as option_a, 'the importance of astronomy in ancient Hawaiian culture.' as option_b, 'the regrettable decline of astronomy in modern Hawaii.' as option_c, 'her appreciation for star watchers'' contributions to navigation.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text2' as text_num, 27 as question_number, 'Mauna Kea is deemed as an ideal astronomical site due to' as question_text, 'its religious significance to the locals.' as option_a, 'its geographical features.' as option_b, 'its protective atmosphere.' as option_c, 'its proximity to the equator.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text2' as text_num, 28 as question_number, 'The construction of the TMT is opposed by some locals partly because' as question_text, 'it may risk ruining the landscape.' as option_a, 'it reminds them of the colonial past.' as option_b, 'it is considered a violation of the sacred land.' as option_c, 'it will affect their economic interests.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text2' as text_num, 29 as question_number, 'It can be inferred from Paragraph 5 that progress in astronomy' as question_text, 'may change the course of human civilization.' as option_a, 'depends on the construction of new telescopes.' as option_b, 'has been hindered by cultural disputes.' as option_c, 'requires international cooperation.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text2' as text_num, 30 as question_number, 'The author''s attitude toward choosing Mauna Kea as the TMT site is one of' as question_text, 'supportive.' as option_a, 'critical.' as option_b, 'indifferent.' as option_c, 'cautious.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text3' as text_num, 31 as question_number, 'Robert F. Kennedy is cited because he' as question_text, 'praised the UK for its GDP.' as option_a, 'identified the limitations of GDP.' as option_b, 'suggested that GDP was the best measure of well-being.' as option_c, 'argued that GDP should be replaced by other measures.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text3' as text_num, 32 as question_number, 'It can be inferred from Paragraph 2 that' as question_text, 'the UK has benefited greatly from its GDP growth.' as option_a, 'GDP as the sole measure of progress is being questioned.' as option_b, 'Brexit has had a positive impact on the UK economy.' as option_c, 'the UK''s GDP growth rate has exceeded expectations.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text3' as text_num, 33 as question_number, 'Which of the following is true about the recent annual study?' as question_text, 'It is sponsored by the government.' as option_a, 'It excludes factors that are hard to measure.' as option_b, 'It converts well-being into economic indicators.' as option_c, 'It gives a comprehensive assessment of well-being.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text3' as text_num, 34 as question_number, 'In the last two paragraphs, the author suggests that' as question_text, 'the UK is well prepared for the challenges ahead.' as option_a, 'GDP should no longer be used as a measure of progress.' as option_b, 'policymakers should look beyond GDP for better indicators.' as option_c, 'economic growth alone can ensure people''s well-being.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'GDP and Well-being: A UK Perspective' as option_a, 'High GDP but Low Well-being?' as option_b, 'The Limitations of GDP as a Measure of Progress' as option_c, 'Beyond GDP: Measuring What Matters' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text4' as text_num, 36 as question_number, 'The Supreme Court decision on McDonnell''s case' as question_text, 'overturned the corruption conviction of a former governor.' as option_a, 'redefined the scope of official acts.' as option_b, 'clarified the boundary between politics and business.' as option_c, 'set a new standard for corruption cases.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text4' as text_num, 37 as question_number, 'According to Paragraph 4, an official act is deemed as one' as question_text, 'that involves a formal decision or action on a specific matter.' as option_a, 'that is motivated by personal gain.' as option_b, 'that is performed in exchange for gifts.' as option_c, 'that is influenced by external pressure.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text4' as text_num, 38 as question_number, 'The court''s ruling is based on the assumption that public officials' as question_text, 'are immune to corruption charges.' as option_a, 'should be held to higher ethical standards.' as option_b, 'may engage in constituent service without criminal liability.' as option_c, 'should avoid any contact with business leaders.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text4' as text_num, 39 as question_number, 'What does the author think of the court''s ruling?' as question_text, 'It is a well-balanced decision.' as option_a, 'It may set back anti-corruption efforts.' as option_b, 'It is too lenient on corrupt officials.' as option_c, 'It will have limited practical impact.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2017 as year, 'Text4' as text_num, 40 as question_number, 'What can be inferred from the last paragraph?' as question_text, 'The ruling will discourage corruption prosecutions.' as option_a, 'The definition of corruption will remain unchanged.' as option_b, 'The court''s narrow definition may need revision.' as option_c, 'More officials will be convicted of corruption.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text1' as text_num, 21 as question_number, 'Who will be most threatened by automation?' as question_text, 'Leading politicians.' as option_a, 'Low-wage laborers.' as option_b, 'Robot owners.' as option_c, 'Middle-class workers.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text1' as text_num, 22 as question_number, 'Which of the following best represents the author''s view?' as question_text, 'Worries about automation are in fact groundless.' as option_a, 'Optimists'' opinions on new tech find little support.' as option_b, 'Issues arising from automation need to be tackled.' as option_c, 'Negative consequences of new tech can be avoided.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text1' as text_num, 23 as question_number, 'Education in the age of automation should put more emphasis on' as question_text, 'creative potential.' as option_a, 'job-hunting skills.' as option_b, 'individual needs.' as option_c, 'cooperative spirit.' as option_d, 'A' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 5/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2018 as year, 'Text1' as text_num, 24 as question_number, 'The author suggests that tax policies be aimed at' as question_text, 'encouraging the development of automation.' as option_a, 'increasing the return on capital investment.' as option_b, 'easing the hostility between rich and poor.' as option_c, 'preventing the income gap from widening.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text1' as text_num, 25 as question_number, 'In this text, the author presents a problem with' as question_text, 'opposing views on it.' as option_a, 'possible solutions to it.' as option_b, 'its alarming impacts.' as option_c, 'its major variations.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text2' as text_num, 26 as question_number, 'According to Paragraphs 1 and 2, many young Americans cast doubts on' as question_text, 'the justification of the news-filtering practice.' as option_a, 'people''s preference for social media platforms.' as option_b, 'the administration''s ability to handle information.' as option_c, 'social media as a reliable source of news.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text2' as text_num, 29 as question_number, 'The Barna survey found that a main cause for the fake news problem is' as question_text, 'readers'' outdated values.' as option_a, 'journalists'' biased reporting.' as option_b, 'readers'' misinterpretation.' as option_c, 'journalists'' made-up stories.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'A Rise in Critical Skills for Sharing News Online' as option_a, 'A Counteraction Against the Over-tweeting Trend' as option_b, 'The Accumulation of Mutual Trust on Social Media' as option_c, 'The Platforms for Projection of Personal Interests' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text3' as text_num, 31 as question_number, 'What is true of the agreement between the NHS and DeepMind?' as question_text, 'It fell short of the expectations of patients.' as option_a, 'It caused widespread anger among patients.' as option_b, 'It was based on a thorough evaluation of privacy.' as option_c, 'It put the interests of patients first.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text3' as text_num, 32 as question_number, 'The NHS trust responded to Denham''s ruling with' as question_text, 'empty promises.' as option_a, 'sincere apologies.' as option_b, 'necessary adjustments.' as option_c, 'total denial.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text3' as text_num, 33 as question_number, 'The author argues in Paragraph 2 that privacy law' as question_text, 'is sufficient for the digital age.' as option_a, 'fails to address the real issue of data value.' as option_b, 'should be the primary concern in data protection.' as option_c, 'needs to be updated to cover AI applications.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text3' as text_num, 34 as question_number, 'According to the last paragraph, the real worry about data is' as question_text, 'who benefits from its analysis.' as option_a, 'how it is collected and stored.' as option_b, 'whether it is used for public good.' as option_c, 'who owns the data.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text3' as text_num, 35 as question_number, 'The author''s attitude towards the application of AI to healthcare is' as question_text, 'enthusiastic.' as option_a, 'cautious.' as option_b, 'indifferent.' as option_c, 'hostile.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text4' as text_num, 36 as question_number, 'One of the reasons for the USPS''s financial problem is' as question_text, 'its rigid management.' as option_a, 'the decline of the postal market.' as option_b, 'the excessive benefits for employees.' as option_c, 'the competition from private carriers.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text4' as text_num, 37 as question_number, 'The USPS can best adapt to the digital age by' as question_text, 'cutting its operating costs.' as option_a, 'reforming its governance structure.' as option_b, 'providing more value-added services.' as option_c, 'increasing the price of stamps.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text4' as text_num, 38 as question_number, 'The author suggests that the USPS should' as question_text, 'be fully privatized.' as option_a, 'be restructured as a profitable business.' as option_b, 'remain a public service institution.' as option_c, 'be merged with private carriers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text4' as text_num, 39 as question_number, 'It can be inferred from the last paragraph that' as question_text, 'the USPS will soon go bankrupt.' as option_a, 'the USPS needs congressional support for reforms.' as option_b, 'the USPS''s problems are beyond repair.' as option_c, 'the USPS should be left to market forces.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2018 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The USPS: An Outdated Institution' as option_a, 'The USPS: A Problem That Won''t Go Away' as option_b, 'The USPS: Chronic Trouble, Not Yet Fatal' as option_c, 'The USPS: Restructure or Perish' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text1' as text_num, 21 as question_number, 'According to Paragraph 1, the financial regulators in Britain imposed the rule to' as question_text, 'ensure the safety of banks'' operations.' as option_a, 'prevent bankers from taking excessive risks.' as option_b, 'help banks achieve better performance.' as option_c, 'protect the interests of bank executives.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text1' as text_num, 22 as question_number, 'What can be inferred about the rule from Paragraph 2?' as question_text, 'It has been widely adopted by banks worldwide.' as option_a, 'It has been criticized by some bank executives.' as option_b, 'It may not be effective in preventing financial crises.' as option_c, 'It has been rejected by most European countries.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text1' as text_num, 24 as question_number, 'It can be learned from Paragraph 4 that' as question_text, 'short-termism is unique to the financial sector.' as option_a, 'short-termism has been largely eliminated.' as option_b, 'short-termism is a widespread problem.' as option_c, 'short-termism benefits long-term investors.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Bankers'' Bonuses: A Necessary Evil' as option_a, 'Short-termism: The Enemy of Long-term Value' as option_b, 'Financial Regulation: Too Strict or Too Loose?' as option_c, 'Britain''s New Rule on Bank Executives' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text2' as text_num, 26 as question_number, 'Grade inflation is attributed by some to' as question_text, 'students'' improved academic performance.' as option_a, 'colleges'' desire to attract more students.' as option_b, 'the declining quality of education.' as option_c, 'the pressure from employers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text2' as text_num, 27 as question_number, 'What does the author say about grade forgiveness?' as question_text, 'It is a well-justified practice.' as option_a, 'It benefits students in the long run.' as option_b, 'It is essentially grade inflation.' as option_c, 'It has been adopted by most universities.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text2' as text_num, 28 as question_number, 'According to Paragraph 4, grade forgiveness' as question_text, 'was originally designed for struggling students.' as option_a, 'is now available to all students regardless of performance.' as option_b, 'has been criticized by faculty members.' as option_c, 'is intended to reduce dropout rates.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text2' as text_num, 29 as question_number, 'What can be inferred from the last paragraph?' as question_text, 'Grade forgiveness will eventually disappear.' as option_a, 'Employers value grades more than actual abilities.' as option_b, 'Grade forgiveness may do more harm than good.' as option_c, 'Students are aware of the limitations of grade forgiveness.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text2' as text_num, 30 as question_number, 'The author''s attitude toward grade forgiveness is' as question_text, 'supportive.' as option_a, 'critical.' as option_b, 'objective.' as option_c, 'indifferent.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text3' as text_num, 31 as question_number, 'The author mentions the AI Now Institute to show that' as question_text, 'AI research is advancing rapidly.' as option_a, 'AI ethics is receiving growing attention.' as option_b, 'AI poses significant risks to society.' as option_c, 'AI regulation is urgently needed.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text3' as text_num, 32 as question_number, 'According to Paragraph 2, the problem with AI is that' as question_text, 'it lacks transparency in decision-making.' as option_a, 'it is not as intelligent as humans.' as option_b, 'it cannot be applied to healthcare.' as option_c, 'it is too expensive to develop.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text3' as text_num, 33 as question_number, 'The author suggests that AI companies should' as question_text, 'focus on developing more advanced algorithms.' as option_a, 'be more open about their AI systems.' as option_b, 'prioritize profit over social responsibility.' as option_c, 'reduce their investment in AI research.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text3' as text_num, 34 as question_number, 'It can be inferred from the text that' as question_text, 'AI will eventually replace human workers.' as option_a, 'the public is generally optimistic about AI.' as option_b, 'AI development needs more ethical oversight.' as option_c, 'AI companies are already doing enough for ethics.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'AI: The Next Big Thing' as option_a, 'AI Ethics: More Talk Than Action' as option_b, 'The Dark Side of Artificial Intelligence' as option_c, 'How to Regulate AI Development' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text4' as text_num, 36 as question_number, 'The Supreme Court''s decision on online sales tax will' as question_text, 'benefit online retailers.' as option_a, 'affect consumers'' shopping habits.' as option_b, 'make states more dependent on sales tax.' as option_c, 'level the playing field for brick-and-mortar stores.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text4' as text_num, 37 as question_number, 'It can be learned from Paragraph 2 that' as question_text, 'the previous ruling was outdated.' as option_a, 'online retailers supported the new ruling.' as option_b, 'states had no right to collect sales tax before.' as option_c, 'the new ruling was unanimously supported.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text4' as text_num, 38 as question_number, 'What is the attitude of small retailers toward the ruling?' as question_text, 'Supportive.' as option_a, 'Opposed.' as option_b, 'Indifferent.' as option_c, 'Cautious.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text4' as text_num, 39 as question_number, 'According to the text, the main concern about the ruling is' as question_text, 'its impact on small businesses.' as option_a, 'its constitutionality.' as option_b, 'its implementation complexity.' as option_c, 'its effect on consumer prices.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2019 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Online Sales Tax: A Fair Deal for All' as option_a, 'The Battle Over Online Sales Tax' as option_b, 'States Win the Right to Tax Online Sales' as option_c, 'How Online Sales Tax Will Change Shopping' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text1' as text_num, 21 as question_number, 'According to Paragraph 1, the proposal to institute a UK "town of culture" award is' as question_text, 'inspired by a similar scheme in Europe.' as option_a, 'aimed at boosting local economies.' as option_b, 'intended to promote cultural exchange.' as option_c, 'driven by a Labour MP''s initiative.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text1' as text_num, 22 as question_number, 'The author suggests that the UK "city of culture" award has' as question_text, 'achieved its intended goals.' as option_a, 'brought significant economic benefits.' as option_b, 'been misused for political purposes.' as option_c, 'failed to produce lasting cultural impact.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text1' as text_num, 23 as question_number, 'Which of the following is true about the "town of culture" award?' as question_text, 'It is open to towns of all sizes.' as option_a, 'It will be decided by a panel of experts.' as option_b, 'It requires substantial investment from the winning town.' as option_c, 'It may not bring the expected benefits.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text1' as text_num, 24 as question_number, 'The author''s attitude toward the "town of culture" proposal is' as question_text, 'supportive.' as option_a, 'skeptical.' as option_b, 'indifferent.' as option_c, 'enthusiastic.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'A Cultural Award That May Not Work' as option_a, 'The Success of the City of Culture Award' as option_b, 'Why Towns Need Cultural Recognition' as option_c, 'Culture as an Economic Driver' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text2' as text_num, 26 as question_number, 'Scientific publishing is described as' as question_text, 'a highly competitive field.' as option_a, 'a lucrative business for publishers.' as option_b, 'a system in need of reform.' as option_c, 'a model of open collaboration.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text2' as text_num, 27 as question_number, 'According to the text, the open-access model' as question_text, 'has been widely adopted by publishers.' as option_a, 'shifts the cost from readers to authors.' as option_b, 'has reduced the quality of scientific publications.' as option_c, 'benefits only well-funded researchers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text2' as text_num, 28 as question_number, 'The author believes that scientific publishers' as question_text, 'provide valuable services to the research community.' as option_a, 'exploit the free labor of researchers and reviewers.' as option_b, 'should be replaced by government-run platforms.' as option_c, 'have improved the efficiency of peer review.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text2' as text_num, 29 as question_number, 'What can be inferred about Plan S?' as question_text, 'It has been embraced by all publishers.' as option_a, 'It aims to make all research freely accessible.' as option_b, 'It will reduce the quality of published research.' as option_c, 'It has been criticized by researchers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Crisis in Scientific Publishing' as option_a, 'Why Scientific Papers Should Be Free' as option_b, 'The Business of Scientific Publishing' as option_c, 'Open Access: The Future of Science' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text3' as text_num, 31 as question_number, 'The author mentions the gender pay gap to' as question_text, 'highlight the persistence of gender inequality.' as option_a, 'criticize companies for not doing enough.' as option_b, 'illustrate the limitations of current measures.' as option_c, 'show the progress made in recent years.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text3' as text_num, 32 as question_number, 'According to Paragraph 2, mandatory gender pay reporting' as question_text, 'has significantly reduced the gender pay gap.' as option_a, 'has been opposed by most companies.' as option_b, 'has had limited impact on closing the gap.' as option_c, 'has been adopted worldwide.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text3' as text_num, 33 as question_number, 'The author suggests that the gender pay gap' as question_text, 'can be solved by government mandates alone.' as option_a, 'requires more than just reporting requirements.' as option_b, 'is primarily caused by women''s career choices.' as option_c, 'will close naturally over time.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text3' as text_num, 34 as question_number, 'What can be inferred from the last paragraph?' as question_text, 'Companies are genuinely committed to gender equality.' as option_a, 'The gender pay gap will persist without deeper changes.' as option_b, 'Government intervention is unnecessary.' as option_c, 'Women should negotiate for higher salaries.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Gender Pay Gap: A Persistent Problem' as option_a, 'Why Reporting Isn''t Enough to Close the Gender Pay Gap' as option_b, 'How Companies Are Addressing Gender Inequality' as option_c, 'Government vs. Market: Solving the Gender Pay Gap' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text4' as text_num, 36 as question_number, 'The Supreme Court''s decision in South Dakota v. Wayfair' as question_text, 'overturned a previous ruling on online sales tax.' as option_a, 'allowed states to tax online sales from out-of-state sellers.' as option_b, 'exempted small businesses from collecting sales tax.' as option_c, 'established a national sales tax rate.' as option_d, 'B' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 6/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2020 as year, 'Text4' as text_num, 37 as question_number, 'Before the Wayfair ruling, online retailers' as question_text, 'were required to collect sales tax in all states.' as option_a, 'only collected sales tax in states where they had a physical presence.' as option_b, 'were exempt from collecting any sales tax.' as option_c, 'voluntarily collected sales tax for all states.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text4' as text_num, 38 as question_number, 'According to the text, the Wayfair ruling' as question_text, 'has been smoothly implemented across all states.' as option_a, 'has created compliance challenges for small businesses.' as option_b, 'has significantly increased consumer prices.' as option_c, 'has been challenged in court by online retailers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text4' as text_num, 39 as question_number, 'The author''s attitude toward the Wayfair ruling is' as question_text, 'entirely supportive.' as option_a, 'cautiously optimistic.' as option_b, 'highly critical.' as option_c, 'neutral.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2020 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The End of Tax-Free Online Shopping' as option_a, 'How the Wayfair Ruling Changed E-commerce' as option_b, 'States, Sellers, and the New Sales Tax Landscape' as option_c, 'Online Sales Tax: Fairness vs. Complexity' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text1' as text_num, 21 as question_number, 'The author holds that this year''s increase in rail passengers fares' as question_text, 'will ease train operators'' burden.' as option_a, 'has kept pace with inflation.' as option_b, 'is a big surprise to commuters.' as option_c, 'remains an unreasonable measure.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text1' as text_num, 22 as question_number, 'The stockbroker in Paragraph 2 is used to stand for' as question_text, 'car drivers.' as option_a, 'rail travellers.' as option_b, 'local investors.' as option_c, 'ordinary taxpayers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text1' as text_num, 23 as question_number, 'It is indicated in Paragraph 3 that train operators' as question_text, 'are offering compensation to commuters.' as option_a, 'are trying to repair relations with the unions.' as option_b, 'have failed to provide an adequate service.' as option_c, 'have suffered huge losses owing to the strikes.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text1' as text_num, 24 as question_number, 'If unable to calm down passengers, the railways may have to face' as question_text, 'the loss of investment.' as option_a, 'the collapse of operations.' as option_b, 'a reduction of revenue.' as option_c, 'a change of ownership.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Who Are to Blame for the Strikes?' as option_a, 'Constant Complaining Doesn''t Work' as option_b, 'Can Nationalisation Bring Hope?' as option_c, 'Ever-Rising Fares Aren''t Sustainable' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text2' as text_num, 26 as question_number, 'According to the first two paragraphs, CCT programs aim to' as question_text, 'facilitate health care reform.' as option_a, 'help poor families get better off.' as option_b, 'improve local education systems.' as option_c, 'lower deforestation rates.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text2' as text_num, 27 as question_number, 'The study based on an area in Mexico is cited to show that' as question_text, 'cattle rearing has been a major means of livelihood for the poor.' as option_a, 'CCT programs have helped preserve traditional lifestyles.' as option_b, 'antipoverty efforts require the participation of local farmers.' as option_c, 'economic growth tends to cause environmental degradation.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text2' as text_num, 28 as question_number, 'In his study about Indonesia, Ferraro intends to find out' as question_text, 'its acceptance level of CCTs.' as option_a, 'its annual rate of poverty alleviation.' as option_b, 'the relation of CCTs to its forest loss.' as option_c, 'the role of its forests in climate change.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text2' as text_num, 29 as question_number, 'According to Ferraro, the CCT program in Indonesia is most valuable in that' as question_text, 'it will benefit other Asian countries.' as option_a, 'it will reduce regional inequality.' as option_b, 'it can protect the environment.' as option_c, 'it can boost grain production.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text2' as text_num, 30 as question_number, 'What is the text centered on?' as question_text, 'The effects of a program.' as option_a, 'The debates over a program.' as option_b, 'The process of a study.' as option_c, 'The transferability of a study.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text3' as text_num, 31 as question_number, 'According to Paragraph 1, the author''s posts on Twitter' as question_text, 'changed people''s impression of the Victorians.' as option_a, 'highlighted social media''s role in Victorian studies.' as option_b, 're-evaluated the Victorians'' notion of public image.' as option_c, 'illustrated the development of Victorian photography.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text3' as text_num, 32 as question_number, 'What does the author say about the Victorian portraits he has collected?' as question_text, 'They are in popular use among historians.' as option_a, 'They are rare among photographs of that age.' as option_b, 'They mirror 19th-century social conventions.' as option_c, 'They show effects of different exposure times.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text3' as text_num, 33 as question_number, 'What might have kept the Victorians from smiling for pictures in the 1890s?' as question_text, 'Their inherent social sensitiveness.' as option_a, 'Their tension before the camera.' as option_b, 'Their distrust of new inventions.' as option_c, 'Their unhealthy dental condition.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text3' as text_num, 34 as question_number, 'Mark Twain is quoted to show that the disapproval of smiles in pictures was' as question_text, 'a deep-rooted belief.' as option_a, 'a misguided attitude.' as option_b, 'a controversial view.' as option_c, 'a thought-provoking idea.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following questions does the text answer?' as question_text, 'Why did most Victorians look stern in photographs?' as option_a, 'Why did the Victorians start to view photographs?' as option_b, 'What made photography develop slowly in the Victorian period?' as option_c, 'How did smiling in photographs become a post-Victorian norm?' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text4' as text_num, 36 as question_number, 'There has long been concern that broadband providers would' as question_text, 'bring web-based firms under control.' as option_a, 'slow down the traffic on their network.' as option_b, 'show partiality in treating clients.' as option_c, 'intensify competition with their rivals.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text4' as text_num, 37 as question_number, 'Faced with the demand for net neutrality rules, the FCC' as question_text, 'sticks to an out-of-date order.' as option_a, 'takes an anti-regulatory stance.' as option_b, 'has issued a special resolution.' as option_c, 'has allowed the states to intervene.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text4' as text_num, 38 as question_number, 'What can be learned about AT&T from Paragraph 3?' as question_text, 'It protects against unfair competition.' as option_a, 'It engages in anti-competitive practices.' as option_b, 'It is under the FCC''s investigation.' as option_c, 'It is in pursuit of quality service.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text4' as text_num, 39 as question_number, 'Judge Patricia Millett argues that the appeals court''s decision' as question_text, 'focuses on trivialities.' as option_a, 'conveys an ambiguous message.' as option_b, 'is at odds with its earlier rulings.' as option_c, 'is out of touch with reality.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2021 as year, 'Text4' as text_num, 40 as question_number, 'What does the author argue in the last paragraph?' as question_text, 'Congress needs to take action to ensure net neutrality.' as option_a, 'The FCC should be put under strict supervision.' as option_b, 'Rules need to be set to diversify online services.' as option_c, 'Broadband providers'' rights should be protected.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text1' as text_num, 21 as question_number, 'According to Paragraph 1, plastics are' as question_text, 'too durable to be useful.' as option_a, 'difficult to dispose of properly.' as option_b, 'a growing environmental concern.' as option_c, 'more harmful than previously thought.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text1' as text_num, 23 as question_number, 'It can be inferred from Paragraph 3 that' as question_text, 'plastic recycling has been largely ineffective.' as option_a, 'consumers are willing to pay more for sustainable packaging.' as option_b, 'most plastics can be recycled efficiently.' as option_c, 'the recycling industry is growing rapidly.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text1' as text_num, 24 as question_number, 'The author suggests that the solution to plastic waste lies in' as question_text, 'improving recycling technology.' as option_a, 'reducing plastic production.' as option_b, 'developing biodegradable alternatives.' as option_c, 'raising public awareness.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Plastic Crisis: Too Much, Too Persistent' as option_a, 'Why Recycling Is Not the Answer to Plastic Waste' as option_b, 'Plastic Pollution: A Global Challenge' as option_c, 'How to Solve the Plastic Waste Problem' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text2' as text_num, 26 as question_number, 'According to the text, the UK''s approach to AI regulation is' as question_text, 'overly restrictive.' as option_a, 'light-touch and pragmatic.' as option_b, 'comprehensive and detailed.' as option_c, 'inconsistent and confusing.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text2' as text_num, 27 as question_number, 'The author suggests that the EU''s AI regulation' as question_text, 'is more effective than the UK''s approach.' as option_a, 'may stifle innovation.' as option_b, 'should be adopted globally.' as option_c, 'has been widely praised.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text2' as text_num, 28 as question_number, 'What can be inferred about the UK''s AI strategy?' as question_text, 'It prioritizes economic growth over safety.' as option_a, 'It balances innovation with risk management.' as option_b, 'It is heavily influenced by the tech industry.' as option_c, 'It has been criticized by AI researchers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text2' as text_num, 29 as question_number, 'The author''s attitude toward the UK''s AI regulation is' as question_text, 'enthusiastic.' as option_a, 'cautiously positive.' as option_b, 'highly critical.' as option_c, 'neutral.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'AI Regulation: UK vs. EU' as option_a, 'The UK''s Light-Touch Approach to AI' as option_b, 'How to Regulate Artificial Intelligence' as option_c, 'The Challenges of AI Governance' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text3' as text_num, 31 as question_number, 'According to Paragraph 1, diversity mandates are often seen as' as question_text, 'an effective tool for achieving equality.' as option_a, 'a form of virtue signaling.' as option_b, 'a necessary business practice.' as option_c, 'a threat to meritocracy.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text3' as text_num, 32 as question_number, 'The author suggests that diversity mandates' as question_text, 'have significantly improved workplace equality.' as option_a, 'often fail to achieve their stated goals.' as option_b, 'are opposed by most business leaders.' as option_c, 'should be replaced by voluntary measures.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text3' as text_num, 33 as question_number, 'What can be inferred about gender quotas on boards?' as question_text, 'They have been adopted by most countries.' as option_a, 'They may not lead to broader gender equality.' as option_b, 'They have been proven to improve company performance.' as option_c, 'They are supported by most women executives.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text3' as text_num, 34 as question_number, 'The author believes that real progress in diversity requires' as question_text, 'stronger government mandates.' as option_a, 'genuine commitment from leadership.' as option_b, 'more diversity training programs.' as option_c, 'increased public pressure.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Diversity Mandates: Empty Gestures?' as option_a, 'Why Diversity Mandates Don''t Work' as option_b, 'The Limits of Diversity Quotas' as option_c, 'From Mandates to Meaningful Change' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text4' as text_num, 36 as question_number, 'The author suggests that the Supreme Court''s approach to technology cases' as question_text, 'is well-informed and up-to-date.' as option_a, 'is often out of touch with technological reality.' as option_b, 'favors tech companies over individuals.' as option_c, 'has become more progressive in recent years.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text4' as text_num, 37 as question_number, 'According to the text, the Supreme Court''s decision on cellphone tracking' as question_text, 'established clear rules for digital privacy.' as option_a, 'failed to address the scope of digital surveillance.' as option_b, 'was a landmark victory for privacy advocates.' as option_c, 'was influenced by tech industry lobbying.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text4' as text_num, 38 as question_number, 'The author argues that the judiciary needs to' as question_text, 'defer more to legislative decisions.' as option_a, 'develop greater technological literacy.' as option_b, 'limit its involvement in technology cases.' as option_c, 'follow the lead of other countries.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text4' as text_num, 39 as question_number, 'It can be inferred from the last paragraph that' as question_text, 'the Supreme Court will soon update its approach.' as option_a, 'technological change will force legal reform.' as option_b, 'Congress is better equipped to handle tech issues.' as option_c, 'the current legal framework is adequate for digital age.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2022 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Supreme Court vs. Technology' as option_a, 'Why the Law Can''t Keep Up with Tech' as option_b, 'Digital Privacy and the Supreme Court' as option_c, 'The Judiciary''s Technology Problem' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text1' as text_num, 21 as question_number, 'In Paragraph 1, the weather in Texas is mentioned to' as question_text, 'forecast a policy shift in Texas schools.' as option_a, 'stress the consequences of climate change.' as option_b, 'indicate the atmosphere at the board meeting.' as option_c, 'draw the public''s attention to energy shortages.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text1' as text_num, 22 as question_number, 'What does Quinn think of Hardy?' as question_text, 'She exaggerates the existing data.' as option_a, 'She denies the value of scientific research.' as option_b, 'She shows no respect for scholars and scientists.' as option_c, 'She is influenced by the energy sector.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text1' as text_num, 23 as question_number, 'According to Paragraph 5, Texas receives a low grade because' as question_text, 'its science standards are poorly implemented.' as option_a, 'its textbooks are widely sold elsewhere.' as option_b, 'it has the most populous state in the US.' as option_c, 'it fails to teach climate change adequately.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text1' as text_num, 24 as question_number, 'What can be inferred about climate change education from the last paragraph?' as question_text, 'It is well integrated into all subjects.' as option_a, 'It faces challenges beyond official standards.' as option_b, 'It has improved significantly in recent years.' as option_c, 'It is primarily hindered by funding shortages.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Climate Change Education in Crisis' as option_a, 'Texas Schools and Climate Denial' as option_b, 'The Battle Over Climate Education' as option_c, 'Why Kids Don''t Learn About Climate Change' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text2' as text_num, 26 as question_number, 'According to Paragraph 1, the local newspaper industry' as question_text, 'has been declining for decades.' as option_a, 'is essential to community life.' as option_b, 'has been replaced by digital media.' as option_c, 'is recovering from recent losses.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text2' as text_num, 27 as question_number, 'The author suggests that the decline of local newspapers' as question_text, 'is inevitable in the digital age.' as option_a, 'has serious consequences for democracy.' as option_b, 'is primarily caused by declining readership.' as option_c, 'can be reversed with government support.' as option_d, 'B' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 7/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2023 as year, 'Text2' as text_num, 28 as question_number, 'What can be learned about the newspaper industry from Paragraph 3?' as question_text, 'National newspapers are thriving.' as option_a, 'Local newspapers have found new revenue sources.' as option_b, 'The decline affects communities of all sizes.' as option_c, 'Digital subscriptions have offset print losses.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text2' as text_num, 29 as question_number, 'The author''s attitude toward the future of local newspapers is' as question_text, 'pessimistic.' as option_a, 'optimistic.' as option_b, 'uncertain.' as option_c, 'indifferent.' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Death of Local News' as option_a, 'Why Local Newspapers Matter' as option_b, 'Saving Local Journalism' as option_c, 'Local News in the Digital Age' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text3' as text_num, 31 as question_number, 'The author mentions the open-access movement to show that' as question_text, 'the scientific community values knowledge sharing.' as option_a, 'the current publishing model is unsustainable.' as option_b, 'researchers are dissatisfied with publishers'' profits.' as option_c, 'open access has solved the publishing crisis.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text3' as text_num, 32 as question_number, 'According to the text, scientific publishers' as question_text, 'provide essential editorial services.' as option_a, 'profit from others'' free labor.' as option_b, 'have reduced subscription prices.' as option_c, 'are struggling financially.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text3' as text_num, 33 as question_number, 'The author suggests that the solution to the publishing problem lies in' as question_text, 'government regulation of publishing.' as option_a, 'researchers boycotting expensive journals.' as option_b, 'reforming the entire publishing ecosystem.' as option_c, 'shifting to fully open-access models.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text3' as text_num, 34 as question_number, 'What can be inferred about Plan S from the text?' as question_text, 'It has been widely adopted by publishers.' as option_a, 'It represents a significant step toward open access.' as option_b, 'It has been criticized for being too lenient.' as option_c, 'It will eliminate all subscription-based journals.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Scientific Publishing Crisis' as option_a, 'Why Science Should Be Free' as option_b, 'The Profit Problem in Scientific Publishing' as option_c, 'Open Access: The Only Way Forward' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text4' as text_num, 36 as question_number, 'According to Paragraph 1, the Supreme Court''s decision' as question_text, 'was widely expected.' as option_a, 'surprised many legal experts.' as option_b, 'was a narrow victory.' as option_c, 'addressed a long-standing issue.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text4' as text_num, 37 as question_number, 'The author suggests that the court''s reasoning' as question_text, 'was based on solid legal precedent.' as option_a, 'ignored important practical considerations.' as option_b, 'was influenced by political pressure.' as option_c, 'reflected a misunderstanding of technology.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text4' as text_num, 38 as question_number, 'It can be inferred from the text that' as question_text, 'the court is well-equipped to handle technology cases.' as option_a, 'the court needs to modernize its approach.' as option_b, 'Congress should defer to the court on tech issues.' as option_c, 'the court''s decisions are consistently well-reasoned.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text4' as text_num, 39 as question_number, 'The author''s attitude toward the Supreme Court''s handling of technology is' as question_text, 'respectful.' as option_a, 'critical.' as option_b, 'sympathetic.' as option_c, 'indifferent.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2023 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Supreme Court''s Technology Blind Spot' as option_a, 'Law vs. Technology: An Unequal Battle' as option_b, 'How the Supreme Court Fails the Digital Age' as option_c, 'The Court''s Struggle with New Technology' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text1' as text_num, 21 as question_number, 'According to Paragraph 1, the Roman alphabet was originally developed to' as question_text, 'record Latin literature.' as option_a, 'serve administrative purposes.' as option_b, 'facilitate trade across empires.' as option_c, 'preserve religious texts.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text1' as text_num, 22 as question_number, 'The author mentions the Phoenician alphabet to show that' as question_text, 'it was the first alphabet in history.' as option_a, 'the Roman alphabet evolved from earlier systems.' as option_b, 'it was more efficient than the Roman alphabet.' as option_c, 'it was used exclusively for trade.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text1' as text_num, 23 as question_number, 'It can be inferred from Paragraph 3 that the spread of the alphabet' as question_text, 'was driven primarily by military conquest.' as option_a, 'was facilitated by cultural exchange.' as option_b, 'occurred independently in different regions.' as option_c, 'was resisted by local populations.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text1' as text_num, 24 as question_number, 'The author suggests that the alphabet' as question_text, 'has remained fundamentally unchanged.' as option_a, 'has adapted to different languages and cultures.' as option_b, 'is no longer relevant in the digital age.' as option_c, 'will eventually be replaced by new writing systems.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Evolution of Writing Systems' as option_a, 'How the Alphabet Conquered the World' as option_b, 'The Roman Alphabet: A Lasting Legacy' as option_c, 'From Phoenicia to the Digital Age' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text2' as text_num, 26 as question_number, 'According to Paragraph 1, the sharing economy' as question_text, 'has revolutionized consumer behavior.' as option_a, 'is not as new as it appears.' as option_b, 'has been driven entirely by technology.' as option_c, 'is primarily beneficial for consumers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text2' as text_num, 27 as question_number, 'The author suggests that the term "sharing economy"' as question_text, 'accurately describes the business model.' as option_a, 'masks the profit-driven nature of these platforms.' as option_b, 'was coined by the tech industry.' as option_c, 'has been widely accepted by economists.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text2' as text_num, 28 as question_number, 'What can be inferred about platform companies from Paragraph 3?' as question_text, 'They prioritize the interests of workers.' as option_a, 'They have created new forms of employment.' as option_b, 'They operate in a regulatory gray area.' as option_c, 'They have been strictly regulated by governments.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text2' as text_num, 29 as question_number, 'The author''s attitude toward the sharing economy is' as question_text, 'enthusiastic.' as option_a, 'critical.' as option_b, 'neutral.' as option_c, 'cautiously optimistic.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Sharing Economy: Innovation or Exploitation?' as option_a, 'Why the Sharing Economy Is Not Really Sharing' as option_b, 'The Dark Side of Platform Capitalism' as option_c, 'How Sharing Economy Platforms Disrupt Markets' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text3' as text_num, 31 as question_number, 'According to Paragraph 1, the digital divide' as question_text, 'has narrowed significantly in recent years.' as option_a, 'persists despite growing internet access.' as option_b, 'is primarily a problem in developing countries.' as option_c, 'has been solved by government programs.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text3' as text_num, 32 as question_number, 'The author suggests that internet access alone' as question_text, 'is sufficient to bridge the digital divide.' as option_a, 'does not guarantee digital literacy.' as option_b, 'has improved educational outcomes.' as option_c, 'is the most important factor in digital equality.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text3' as text_num, 33 as question_number, 'What can be inferred about digital skills training?' as question_text, 'It is widely available in underserved communities.' as option_a, 'It is as important as providing internet access.' as option_b, 'It has been largely ineffective.' as option_c, 'It should be the responsibility of tech companies.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text3' as text_num, 34 as question_number, 'The author argues that closing the digital divide requires' as question_text, 'more affordable devices.' as option_a, 'a comprehensive approach beyond connectivity.' as option_b, 'greater investment in broadband infrastructure.' as option_c, 'stronger government regulation.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Beyond Connectivity: The Real Digital Divide' as option_a, 'Why Internet Access Isn''t Enough' as option_b, 'The Persistent Problem of Digital Inequality' as option_c, 'How to Close the Digital Divide' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text4' as text_num, 36 as question_number, 'According to Paragraph 1, the current approach to AI regulation' as question_text, 'is well-coordinated across countries.' as option_a, 'lacks international consensus.' as option_b, 'is too restrictive for innovation.' as option_c, 'has been effective in preventing harm.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text4' as text_num, 37 as question_number, 'The author suggests that the EU''s AI Act' as question_text, 'sets a global standard for AI regulation.' as option_a, 'may not be flexible enough for rapid technological change.' as option_b, 'has been widely adopted by other countries.' as option_c, 'focuses too much on economic benefits.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text4' as text_num, 38 as question_number, 'What can be inferred about the race to regulate AI?' as question_text, 'It is driven primarily by economic competition.' as option_a, 'It may lead to fragmented and inconsistent rules.' as option_b, 'It has slowed down AI development.' as option_c, 'It is coordinated by international organizations.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text4' as text_num, 39 as question_number, 'The author argues that effective AI regulation requires' as question_text, 'a single global regulatory framework.' as option_a, 'international cooperation and coordination.' as option_b, 'less government intervention overall.' as option_c, 'industry self-regulation.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2024 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Global Race to Regulate AI' as option_a, 'Why AI Regulation Needs Global Cooperation' as option_b, 'AI Regulation: A Fragmented Landscape' as option_c, 'The Challenges of Governing Artificial Intelligence' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text1' as text_num, 21 as question_number, 'According to Paragraph 1, the new research suggests that' as question_text, 'exercise has no effect on cognitive function.' as option_a, 'physical activity can slow cognitive decline.' as option_b, 'only intense exercise benefits the brain.' as option_c, 'cognitive decline is inevitable with age.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text1' as text_num, 22 as question_number, 'The study mentioned in Paragraph 2 found that' as question_text, 'all types of exercise produce the same benefits.' as option_a, 'aerobic exercise is more beneficial than strength training.' as option_b, 'even moderate exercise can improve brain health.' as option_c, 'exercise only benefits younger adults.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text1' as text_num, 23 as question_number, 'What can be inferred about BDNF from the text?' as question_text, 'It is a hormone that reduces inflammation.' as option_a, 'It plays a key role in exercise-related brain benefits.' as option_b, 'It is only produced during intense exercise.' as option_c, 'It decreases with regular physical activity.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text1' as text_num, 24 as question_number, 'The author suggests that the relationship between exercise and brain health' as question_text, 'is well understood by the medical community.' as option_a, 'deserves more attention from policymakers.' as option_b, 'should be studied further before making recommendations.' as option_c, 'is too complex to be practically useful.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'How Exercise Protects Your Brain' as option_a, 'The Science of Exercise and Cognitive Health' as option_b, 'Why You Should Exercise for Your Brain' as option_c, 'Exercise: The Best Medicine for Aging Brains' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text2' as text_num, 26 as question_number, 'According to Paragraph 1, the gig economy' as question_text, 'has created more stable jobs.' as option_a, 'has transformed traditional employment.' as option_b, 'benefits workers more than employers.' as option_c, 'is a temporary phenomenon.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text2' as text_num, 27 as question_number, 'The author suggests that gig workers' as question_text, 'enjoy greater flexibility than traditional employees.' as option_a, 'often lack basic labor protections.' as option_b, 'are well-represented by labor unions.' as option_c, 'prefer gig work over traditional employment.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text2' as text_num, 28 as question_number, 'What can be inferred about the classification of gig workers?' as question_text, 'They are universally classified as independent contractors.' as option_a, 'The current classification system is inadequate.' as option_b, 'Most countries have updated their labor laws for gig workers.' as option_c, 'Courts have consistently ruled in favor of gig workers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text2' as text_num, 29 as question_number, 'The author''s attitude toward the gig economy is' as question_text, 'enthusiastic.' as option_a, 'concerned.' as option_b, 'indifferent.' as option_c, 'supportive with reservations.' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Gig Economy: Freedom or Exploitation?' as option_a, 'Why Gig Workers Need Better Protection' as option_b, 'The Future of Work in the Gig Economy' as option_c, 'Rethinking Labor Laws for the Gig Age' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text3' as text_num, 31 as question_number, 'According to Paragraph 1, urban green spaces' as question_text, 'are abundant in most modern cities.' as option_a, 'are increasingly recognized for their health benefits.' as option_b, 'have no significant impact on well-being.' as option_c, 'are primarily valued for their aesthetic appeal.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text3' as text_num, 32 as question_number, 'The study mentioned in Paragraph 2 found that' as question_text, 'all green spaces provide equal health benefits.' as option_a, 'biodiversity in green spaces enhances their health benefits.' as option_b, 'small parks are as beneficial as large ones.' as option_c, 'green spaces only benefit physical health.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text3' as text_num, 33 as question_number, 'What can be inferred about urban planning from the text?' as question_text, 'It has fully incorporated the benefits of green spaces.' as option_a, 'It often prioritizes development over green spaces.' as option_b, 'It has been guided by recent scientific research.' as option_c, 'It treats all green spaces equally.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text3' as text_num, 34 as question_number, 'The author suggests that cities should' as question_text, 'prioritize economic development over green spaces.' as option_a, 'invest in biodiverse green spaces for public health.' as option_b, 'focus on building more parks regardless of quality.' as option_c, 'leave green space planning to private developers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Why Cities Need More Parks' as option_a, 'The Health Benefits of Urban Green Spaces' as option_b, 'Biodiversity and Urban Well-being' as option_c, 'Green Cities, Healthy People' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text4' as text_num, 36 as question_number, 'According to Paragraph 1, the debate over social media regulation' as question_text, 'has been resolved by recent legislation.' as option_a, 'has intensified in recent years.' as option_b, 'is primarily about free speech issues.' as option_c, 'has been ignored by policymakers.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text4' as text_num, 37 as question_number, 'The author suggests that Section 230 of the Communications Decency Act' as question_text, 'has outlived its usefulness.' as option_a, 'needs to be reformed, not eliminated.' as option_b, 'should be repealed entirely.' as option_c, 'has been effective in protecting users.' as option_d, 'B' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;

-- 批次 8/8
WITH passage_map AS (
  SELECT id, year, text_num FROM passages
),
insert_data AS (
  SELECT 2025 as year, 'Text4' as text_num, 38 as question_number, 'What can be inferred about the tech industry''s response to regulation?' as question_text, 'It has been cooperative and proactive.' as option_a, 'It has resisted meaningful reform.' as option_b, 'It has voluntarily improved content moderation.' as option_c, 'It has proposed effective self-regulation measures.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text4' as text_num, 39 as question_number, 'The author argues that social media regulation should' as question_text, 'be left to the platforms themselves.' as option_a, 'balance free speech with public safety.' as option_b, 'prioritize national security concerns.' as option_c, 'follow the European model exactly.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2025 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Case for Social Media Regulation' as option_a, 'Free Speech vs. Platform Responsibility' as option_b, 'How to Regulate Social Media Without Censorship' as option_c, 'The Ongoing Battle Over Social Media Governance' as option_d, 'D' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text1' as text_num, 21 as question_number, 'According to Paragraph 1, the new policy aims to' as question_text, 'restrict the development of AI technology.' as option_a, 'establish guidelines for responsible AI use.' as option_b, 'promote AI innovation at any cost.' as option_c, 'replace human workers with AI systems.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text1' as text_num, 22 as question_number, 'The author mentions the EU AI Act to show that' as question_text, 'Europe leads in AI regulation.' as option_a, 'regulatory approaches vary across regions.' as option_b, 'AI regulation is unnecessary.' as option_c, 'the EU''s approach has been ineffective.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text1' as text_num, 23 as question_number, 'It can be inferred from Paragraph 3 that' as question_text, 'AI companies welcome regulation.' as option_a, 'self-regulation has proven sufficient.' as option_b, 'the pace of AI development outstrips regulation.' as option_c, 'AI regulation has kept up with technology.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text1' as text_num, 24 as question_number, 'The author suggests that effective AI governance requires' as question_text, 'a complete ban on high-risk AI applications.' as option_a, 'collaboration between governments and tech companies.' as option_b, 'strict government control over all AI development.' as option_c, 'leaving regulation to market forces.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text1' as text_num, 25 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Challenge of Governing AI' as option_a, 'Why AI Regulation Matters' as option_b, 'AI and the Future of Governance' as option_c, 'Can We Regulate Artificial Intelligence?' as option_d, 'A' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text2' as text_num, 26 as question_number, 'According to Paragraph 1, remote work has' as question_text, 'completely replaced office work.' as option_a, 'fundamentally changed the nature of employment.' as option_b, 'had only temporary effects on workplaces.' as option_c, 'been rejected by most companies.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text2' as text_num, 27 as question_number, 'The author suggests that the shift to remote work' as question_text, 'has benefited all workers equally.' as option_a, 'has created new challenges for work-life balance.' as option_b, 'has reduced overall productivity.' as option_c, 'has eliminated the need for offices.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text2' as text_num, 28 as question_number, 'What can be inferred about hybrid work models?' as question_text, 'They are universally preferred by employees.' as option_a, 'They represent a compromise between flexibility and collaboration.' as option_b, 'They have been proven less effective than full remote work.' as option_c, 'They are only suitable for tech companies.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text2' as text_num, 29 as question_number, 'The author''s attitude toward the future of work is' as question_text, 'pessimistic.' as option_a, 'optimistic.' as option_b, 'cautiously positive.' as option_c, 'indifferent.' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text2' as text_num, 30 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Remote Work Revolution' as option_a, 'How Work Has Changed Forever' as option_b, 'Rethinking the Workplace in a Post-Pandemic World' as option_c, 'The Pros and Cons of Remote Work' as option_d, 'C' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text3' as text_num, 31 as question_number, 'According to Paragraph 1, climate migration' as question_text, 'is a future problem that can be prevented.' as option_a, 'is already affecting millions of people worldwide.' as option_b, 'only affects developing countries.' as option_c, 'has been exaggerated by the media.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text3' as text_num, 32 as question_number, 'The author suggests that current international law' as question_text, 'adequately protects climate refugees.' as option_a, 'does not recognize climate migrants as refugees.' as option_b, 'has been updated to address climate displacement.' as option_c, 'prioritizes climate migrants over other refugees.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text3' as text_num, 33 as question_number, 'What can be inferred about the economic impact of climate migration?' as question_text, 'It only affects the countries people leave.' as option_a, 'It creates both challenges and opportunities for host communities.' as option_b, 'It has been largely positive for receiving countries.' as option_c, 'It has minimal impact on global economies.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text3' as text_num, 34 as question_number, 'The author argues that addressing climate migration requires' as question_text, 'closing borders to migrants.' as option_a, 'international cooperation and proactive planning.' as option_b, 'leaving the problem to affected countries.' as option_c, 'reducing all migration to manageable levels.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text3' as text_num, 35 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'Climate Change and Human Displacement' as option_a, 'The Growing Crisis of Climate Migration' as option_b, 'Who Will Pay for Climate Migration?' as option_c, 'Climate Refugees: A Legal and Moral Challenge' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text4' as text_num, 36 as question_number, 'According to Paragraph 1, the decline of local journalism' as question_text, 'is a recent phenomenon.' as option_a, 'has far-reaching consequences for communities.' as option_b, 'has been offset by national media coverage.' as option_c, 'primarily affects rural areas.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text4' as text_num, 37 as question_number, 'The author suggests that the loss of local news coverage leads to' as question_text, 'increased political participation.' as option_a, 'decreased government accountability.' as option_b, 'more informed citizens.' as option_c, 'stronger community bonds.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text4' as text_num, 38 as question_number, 'What can be inferred about the economic model of local journalism?' as question_text, 'It has been successfully adapted to the digital age.' as option_a, 'It has been undermined by the loss of advertising revenue.' as option_b, 'It relies primarily on subscription income.' as option_c, 'It has been rescued by nonprofit organizations.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text4' as text_num, 39 as question_number, 'The author argues that saving local journalism requires' as question_text, 'complete government takeover of local media.' as option_a, 'innovative funding models and policy support.' as option_b, 'relying solely on digital subscriptions.' as option_c, 'abandoning print media entirely.' as option_d, 'B' as correct_answer
  UNION ALL
  SELECT 2026 as year, 'Text4' as text_num, 40 as question_number, 'Which of the following would be the best title for the text?' as question_text, 'The Death of Local News and What It Means' as option_a, 'Why Local Journalism Matters for Democracy' as option_b, 'Can Local News Survive the Digital Age?' as option_c, 'The Crisis in Local Media and How to Fix It' as option_d, 'A' as correct_answer
)

INSERT INTO questions (passage_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_answer)
SELECT p.id, d.question_number, d.question_text, d.option_a, d.option_b, d.option_c, d.option_d, d.correct_answer
FROM insert_data d
JOIN passage_map p ON p.year = d.year AND p.text_num = d.text_num
ON CONFLICT (passage_id, question_number) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  correct_answer = EXCLUDED.correct_answer;