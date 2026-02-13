export type Letter = {
  id: string;
  title: string;
  date: string;
  preview: string;
  markdown: string;
  lockedUntil?: string | null;
  surprise?: boolean;
};

export const letters: Letter[] = [
  // {
  //   id: "l001",
  //   title: "A Soft Hello",
  //   date: "2023-02-12",
  //   preview: "A tiny beginning that still feels warm.",
  //   markdown: `# A Soft Hello\n\nThis is where we can keep the story simple and true.\n\n- One gentle moment\n- One kind smile\n- One memory worth saving`,
  // },
  // {
  //   id: "l002",
  //   title: "Rainy Day Note",
  //   date: "2023-03-19",
  //   preview: "Small umbrella, big comfort.",
  //   markdown: `# Rainy Day Note\n\nThank you for making ordinary weather feel special.\n\n> Even simple days can be beautiful with the right person.`,
  // },
  // {
  //   id: "l003",
  //   title: "Kitchen Playlist",
  //   date: "2023-04-13",
  //   preview: "A little dance between chores.",
  //   markdown: `# Kitchen Playlist\n\nNo perfect steps needed.\nJust music, warm light, and time together.`,
  // },
  // {
  //   id: "l004",
  //   title: "Museum Promise",
  //   date: "2023-08-09",
  //   preview: "A memory worth revisiting.",
  //   markdown: `# Museum Promise\n\nThis app is a gentle place to keep our favorite moments and update them whenever we want.`,
  // },
  // {
  //   id: "l005",
  //   title: "Midnight Wishes",
  //   date: "2024-01-01",
  //   preview: "Simple hopes for everyday life.",
  //   markdown: `# Midnight Wishes\n\nI hope for calm mornings, shared laughter, and many good ordinary days.`,
  // },
  // {
  //   id: "l006",
  //   title: "Cozy Weekend",
  //   date: "2024-02-17",
  //   preview: "Home can be a feeling.",
  //   markdown: `# Cozy Weekend\n\nThis letter is a placeholder you can quickly rewrite with your own details and inside jokes.`,
  // },
  // {
  //   id: "l007",
  //   title: "Sunny Afternoon",
  //   date: "2024-05-09",
  //   preview: "A short note for bright days.",
  //   markdown: `# Sunny Afternoon\n\nToday felt light, easy, and full of little smiles.`,
  //   lockedUntil: "2026-03-01",
  // },
  // {
  //   id: "l008",
  //   title: "Always in the Small Things",
  //   date: "2024-09-20",
  //   preview: "Care in tiny details.",
  //   markdown: `# Always in the Small Things\n\n- Tea made the way I like it\n- A text at the right time\n- The quiet comfort of being understood`,
  // },
  // {
  //   id: "l999",
  //   title: "Surprise Letter",
  //   date: "2026-02-14",
  //   preview: "Unlocked for devoted museum visitors.",
  //   surprise: true,
  //   markdown: `# Surprise Letter\n\nYou stayed curious and kept opening memories.\n\nThank you for caring for this little museum.`,
  // },
  {
    id: "love-realized",
    title: "သဲကို ချစ်နေမိလာပြီဆိုတာ သတိထားမိတဲ့နေ့",
    date: "2026-02-13",
    preview: "ကိုကို ဘယ်နေ့ကစပြီး သဲကို ဒီလိုလေး ဂရုစိုက်လာမိလဲ...",
    surprise: false,
    lockedUntil: null,
    markdown: `ကိုကို့ရဲ့ သဲရေ,

ကိုကို ဘယ်နေ့ကစပြီး သဲကို ဒီလိုလေး ဂရုစိုက်လာမိလဲ ကိုကိုကိုယ်တိုင်တောင် မသိဘူး။
တစ်ခါတစ်လေ သဲနားမှာပဲ ရှိနေရင်ကို ပြည့်စုံသလို ခံစားရတယ်။

သဲနဲ့ အတူရှိရတဲ့ အချိန်တိုင်းက ကိုကိုအတွက် အမှတ်တရတွေ ဖြစ်နေတယ်။
သဲရဲ့ အသံ၊ သဲရဲ့ အပြုံး၊ သဲရဲ့ သဘောထားလေးတွေက ကိုကိုရဲ့ နေ့ရက်တွေကို ပိုလှစေတယ်။

သဲမသိသေးခင် (ကိုကိုလဲ မသိလိုက်သေးခင်) မှာပဲ ကိုကိုရဲ့ စိတ်ထဲမှာ သဲအတွက်နေရာတစ်ခု ဖန်တီးထားပြီးသား ဖြစ်ခဲ့တယ်ထင်တယ်။

အမြဲတမ်း သဲဘက်မှာပဲ ရှိချင်တဲ့  
ကိုကို`,
  },
  {
    id: "everyday-with-you",
    title: "ကိုကိုရဲ့ နေ့တိုင်း",
    date: "2026-02-13",
    preview: "ကိုကိုရဲ့ နေ့တိုင်းမှာ သဲပါဝင်နေတယ်ဆိုတာ...",
    surprise: false,
    lockedUntil: null,
    markdown: `သဲရေ,

ကိုကိုရဲ့ နေ့တိုင်းမှာ သဲပါဝင်နေတယ်ဆိုတာ သဲသတိထားမိလား။
သဲနဲ့ ရှိရတဲ့ အခိုက်အတန့်၊ မိနစ်အနည်းငယ် လောက်ပဲ ဖြစ်နေပါစေ၊ ကိုကိုအတွက် အားလုံးထက် တန်ဖိုးရှိတယ်။

သဲနဲ့ ရယ်မောနေရတဲ့ အချိန်တွေက ကိုကိုရဲ့ စိတ်ပင်ပန်းမှုတွေကို မေ့စေတယ်။
သဲနားမှာ ရှိရင် ကိုကိုက ပိုပြီး သာယာသလို ခံစားရတယ်။

သဲကို ချစ်တာကိုတော့ ကိုကိုက တခါတလေ စကားလုံးတွေနဲ့ မဖော်ပြမိဘူးဖြစ်နေတတ်တယ် ၊ ဒါပေမယ့် ကိုကို့ ချစ်ခြင်းက တကယ်လေးနက် တယ်ဆိုတာ စကားလုံးတွေ အများကြီးနဲ့ဖော်ပြဖို့ မလိုဘူးထင်တယ်။

သဲကြိုက်တဲ့ သီချင်းလိုပေါ့ “စကားလုံးတွေသိပ်မလိုဘူး “။

အမြဲ သဲသဲကို ဂရုစိုက်နေတဲ့  
ကိုကို`,
  },
  {
    id: "future-with-you",
    title: "နောင်လာမယ့်နေ့ရက်တွေ",
    date: "2026-02-13",
    preview: "တခါတလေ ကိုကို စဉ်းစားမိတယ်...",
    surprise: false,
    lockedUntil: null,
    markdown: `သဲရေ,

တခါတလေ ကိုကို စဉ်းစားမိတယ်၊  
အနာဂတ်မှာ ကိုကိုတို့ ဘယ်လိုပုံစံနဲ့ ရှိနေမလဲဆိုတာ။

ကိုကို သိရတာတစ်ခုကတော့  
သဲနဲ့ အတူရှိရင် ဘယ်နေရာမဆို ကိုကိုအတွက် အိမ်လိုပဲ။

နောင်လာမယ့် ရက်တွေမှာ ကောင်းတဲ့အရာတွေ ဒါမှမဟုတ် ဆိုးတဲ့ အရာတွေ၊ ဘာတွေပဲကြုံတွေ့ရပါစေ အားလုံးကို သဲနဲ့ အတူမျှဝေချင်တယ်။

သဲက ကိုကိုရဲ့ နောင်လာမယ့်နေ့ရက်တွေပါပဲ။

အနာဂတ်ကို သဲသဲနဲ့ ပုံဖော်ကြည့်နေတဲ့  
ကိုကို`,
  },
];
