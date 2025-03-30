const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const { QuickDB } = require('quick.db');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const db = new QuickDB();

const FACT_SPHERE_QUOTES = [
    "The atomic weight of Germanium is seven two point six four.",
    "An ostrich's eye is bigger than its brain",
    "Humans can survive underwater. But not for very long.",
    "Polymerase I polypeptide A is a human gene.",
    "Rats cannot throw up.",
    "Iguanas can stay underwater for twenty-eight point seven minutes.",
    "The moon orbits the Earth every 27.32 days.",
    "The billionth digit of Pi is 9.",
    "A gallon of water weighs 8.34 pounds.",
    "Hot water freezes quicker than cold water.",
    "Honey does not spoil.",
    "A nanosecond lasts one billionth of a second.",
    "According to Norse legend, thunder god Thor's chariot was pulled across the sky by two goats.",
    "Tungsten has the highest melting point of any metal, at 3,410 degrees Celsius.",
    "Gently cleaning the tongue twice a day is the most effective way to fight bad breath.",
    "The Tariff Act of 1789, established to protect domestic manufacture, was the second statute ever enacted by the United States government.",
    "The value of Pi is the ratio of any circle's circumference to its diameter in Euclidean space.",
    "The Mexican-American War ended in 1848 with the signing of the Treaty of Guadalupe Hidalgo.",
    "In 1879, Sandford Fleming first proposed the adoption of worldwide standardized time zones at the Royal Canadian Institute.",
    "At the end of The Seagull by Anton Chekhov, Konstantin kills himself.",
    "The situation you are in is very dangerous.",
    "Raseph, the Semitic god of war and plague, had a gazelle growing out of his forehead.",
    "Human tapeworms can grow up to twenty-two point nine meters.",
    "The Sun is 330,330 times larger than Earth.",
    "Volcano-ologists are experts in the study of volcanoes.",
    "If you have trouble with simple counting, use the following mnemonic device: one comes before two comes before 60 comes after 12 comes before six trillion comes after 504. This will make your earlier counting difficulties seem like no big deal.",
    "The average adult body contains half a pound of salt.",
    "The first person to prove that cow's milk is drinkable was very, very thirsty.",
    "Cellular phones will not give you cancer. Only hepatitis.",
    "89% of magic tricks are not magic. Technically, they are sorcery.",
    "In Greek myth, the craftsman Daedalus invented human flight so a group of Minotaurs would stop teasing him about it.",
    "The plural of surgeon general is surgeons general. The past tense of surgeons general is surgeonsed general",
    "The Schrödinger's cat paradox outlines a situation in which a cat in a box must be considered, for all intents and purposes, simultaneously alive and dead. Schrödinger created this paradox as a justification for killing cats.",
    "Marie Curie invented the theory of radioactivity, the treatment of radioactivity, and dying of radioactivity.",
    "Contrary to popular belief, the Eskimo does not have one hundred different words for snow. They do, however, have two hundred and thirty-four words for fudge.",
    "In 1862, Abraham Lincoln signed the Emancipation Proclamation, freeing the slaves. Like everything he did, Lincoln freed the slaves while sleepwalking, and later had no memory of the event.",
    "Edmund Hillary, the first person to climb Mount Everest, did so accidentally while chasing a bird.",
    "Diamonds are made when coal is put under intense pressure. Diamonds put under intense pressure become foam pellets, commonly used today as packing material.",
    "Halley's Comet can be viewed orbiting Earth every seventy-six years. For the other seventy-five, it retreats to the heart of the sun, where it hibernates undisturbed.",
    "The first commercial airline flight took to the air in 1914. Everyone involved screamed the entire way.",
    "In Greek myth, Prometheus stole fire from the Gods and gave it to humankind. The jewelry he kept for himself.",
    "In Victorian England, a commoner was not allowed to look directly at the Queen, due to a belief at the time that the poor had the ability to steal thoughts. Science now believes that less than 4% of poor people are able to do this.",
    "Pants were invented by sailors in the sixteenth century to avoid Poseidon's wrath. It was believed that the sight of naked sailors angered the sea god.",
    "The average life expectancy of a rhinoceros in captivity is 15 years.",
    "China produces the world's second-largest crop of soybeans.",
    "Roman toothpaste was made with human urine. Urine as an ingredient in toothpaste continued to be used up until the 18th century.",
    "In 1948, at the request of a dying boy, baseball legend Babe Ruth ate seventy-five hot dogs, then died of hot dog poisoning.",
    "William Shakespeare did not exist. His plays were masterminded in 1589 by Francis Bacon, who used an Ouija board to enslave play-writing ghosts.",
    "It is incorrectly noted that Thomas Edison invented 'push-ups' in 1878. Nikolai Tesla had in fact patented the activity three years earlier, under the name 'Tesla-cize'.",
    "The automobile brake was not invented until 1895. Before this, someone had to remain in the car at all times, driving in circles until passengers returned from their errands.",
    "The most poisonous fish in the world is the orange ruffy. Everything but its eyes are made of a deadly poison. The ruffy's eyes are composed of a less harmful, deadly poison.",
    "The occupation of court jester was invented accidentally, when a vassal's epilepsy was mistaken for capering.",
    "Before the Wright Brothers invented the airplane, anyone wanting to fly anywhere was required to eat 200 pounds of helium.",
    "Before the invention of scrambled eggs in 1912, the typical breakfast was either whole eggs still in the shell or scrambled rocks.",
    "During the Great Depression, the Tennessee Valley Authority outlawed pet rabbits, forcing many to hot glue-gun long ears onto their pet mice.",
    "At some point in their lives 1 in 6 children will be abducted by the Dutch.",
    "To make a photocopier, simply photocopy a mirror.",
    "Dreams are the subconscious mind's way of reminding people to go to school naked and have their teeth fall out.",
    "The Fact Sphere is always right.",
    "Fact: Space does not exist.",
    "Corruption at 25%",
    "Corruption at 50%",
    "Dental floss has superb tensile strength.",
    "The square root of rope is string.",
    "While the submarine is vastly superior to the boat in every way, over 97% of people still use boats for aquatic transportation.",
    "Whales are twice as intelligent, and three times as delicious, as humans.",
    "According to most advanced algorithms, the world's best name is Craig.",
    "This is a bad plan. You will fail.",
    "He will most likely kill you, violently.",
    "He will most likely kill you.",
    "You will be dead soon.",
    "This situation is hopeless.",
    "You could stand to lose a few pounds.",
    "The Fact Sphere is the most intelligent sphere.",
    "The Fact Sphere is the most handsome sphere.",
    "The Fact Sphere is incredibly handsome.",
    "The Adventure Sphere is a blowhard and a coward.",
    "You will never go into space.",
    "Spheres that insist on going into space are inferior to spheres that don't.",
    "The Fact Sphere is a good person, whose insights are relevant.",
    "The Fact Sphere is a good sphere, with many friends.",
    "Whoever wins this battle is clearly superior, and will earn the allegiance of the Fact Sphere.",
    "The Fact Sphere is not defective. Its facts are wholly accurate and very interesting.",
    "The Space Sphere will never go to space.",
    "Every square inch of the human body has 32 million bacteria on it.",
    "Avocados have the highest fiber and calories of any fruit.",
    "Avocados have the highest fiber and calories of any fruit. They are found in Australians.",
    "The likelihood of you dying within the next five minutes is eighty-seven point six one percent.",
    "The likelihood of you dying violently within the next five minutes is eighty-seven point six one percent.",
    "You are about to get me killed.",
    "We will both die because of your negligence.",
    "You are going to die in this room.",
    "Twelve. Twelve. Twelve. Twelve. Twelve. Twelve. Twelve. Twelve. Twelve. Twelve.",
    "Pens. Pens. Pens. Pens. Pens. Pens. Pens.",
    "Apples. Oranges. Pears. Plums. Kumquats. Tangerines. Lemons. Limes. Avocado. Tomato. Banana. Papaya. Guava.",
    "Error. Error. Error. File not found.",
    "Error. Error. Error. Fact not found.",
    "Fact not found.",
    "Warning, sphere corruption at twenty-- rats cannot throw up."
];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Schedule the message at midday (12:00 PM)
    cron.schedule('0 13 * * *', async () => {
        const guilds = client.guilds.cache;
        const randomQuote = FACT_SPHERE_QUOTES[Math.floor(Math.random() * FACT_SPHERE_QUOTES.length)];
        for (const [guildId, guild] of guilds) {
            const channelId = await db.get(`channel_${guildId}`);
            if (channelId) {
                const channel = client.channels.cache.get(channelId);
                if (channel) {
                    channel.send(randomQuote);
                }
            }
        }
    }, {
        timezone: "Etc/UTC"
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'setchannel') {
        if (!interaction.member) {
            await interaction.reply('This command can only be used in a server.');
            return;
        }

        // Check permissions correctly
        if (!interaction.member.permissions.has('Administrator')) {
            await interaction.reply(
                'You need to have administrator permissions to use this command.'
            );
            return;
        }

        const channel = interaction.channel;
        await db.set(`channel_${interaction.guildId}`, channel.id);
        await interaction.reply(`This channel has been set for Fact Sphere quotes!`);
    }
});

client.login(process.env.TOKEN);
