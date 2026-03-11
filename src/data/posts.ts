import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";

export interface BlogPost {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  materials: string[];
  size: string;
  difficulty: string;
  timeEstimate: string;
  content: string[];
  steps: string[];
  tips: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "getting-started-with-macrame-keyrings",
    image: blog1,
    title: "Getting Started with Macrame Keyrings",
    excerpt: "Learn the basic knots and techniques to create your very first macrame keyring. A perfect beginner project.",
    date: "Mar 8, 2026",
    category: "Tutorial",
    materials: ["4mm natural cotton rope (50m)", "Wooden dowel (40cm)", "Scissors", "Measuring tape", "Comb or brush"],
    size: "40cm wide × 60cm long",
    difficulty: "Beginner",
    timeEstimate: "3-4 hours",
    content: [
      "Macrame wall hangings are one of the most rewarding beginner projects. They combine simple knots into beautiful patterns that can transform any wall into a boho masterpiece.",
      "In this tutorial, we'll walk through the essential knots — the lark's head, square knot, and spiral knot — and combine them into a stunning wall hanging you'll be proud to display.",
      "The beauty of macrame is in its simplicity. With just a few basic techniques, you can create intricate-looking designs that are actually quite straightforward once you get the rhythm."
    ],
    steps: [
      "Cut 16 strands of rope, each 2.5m long. Fold each strand in half and attach to the dowel using a lark's head knot.",
      "Starting from the left, take 4 strands and create a row of square knots across the entire piece.",
      "For the second row, skip the first 2 strands and create offset square knots to form a diamond pattern.",
      "Continue alternating rows for about 15cm to create a beautiful net-like pattern.",
      "Create a gathering knot in the center using a separate piece of rope to add visual interest.",
      "Trim the fringe at an angle or V-shape. Use a comb to brush out the rope ends for a soft, textured finish."
    ],
    tips: [
      "Use a clipboard or tape the dowel to a surface to keep it steady while you work.",
      "Keep your knots consistent in tension for a professional-looking result.",
      "Natural cotton rope is easiest to work with and gives the most beautiful fringe when combed out."
    ]
    
  },
  {
    slug: "diy-macrame-plant-hangers",
    image: blog2,
    title: "DIY Macrame Plant Hangers",
    excerpt: "Bring nature indoors with these beautiful macrame plant hangers. Simple designs that add bohemian charm to any room.",
    date: "Mar 5, 2026",
    category: "DIY",
    materials: ["5mm cotton rope (25m)", "Metal or wooden ring (5cm)", "Plant pot (15cm diameter)", "Scissors", "Beads (optional)"],
    size: "Holds pots up to 15cm diameter, 80cm total length",
    difficulty: "Beginner",
    timeEstimate: "2-3 hours",
    content: [
      "Plant hangers are the quintessential macrame project. They're practical, beautiful, and surprisingly easy to make.",
      "This design uses just two types of knots and can be completed in a single afternoon. The result is a stunning hanging planter that brings life to any corner.",
      "You can customize the length and pot size to fit your space perfectly."
    ],
    steps: [
      "Cut 8 strands of rope, each 3m long. Thread them through the ring and even out the ends.",
      "Create a gathering knot just below the ring using a separate piece of rope.",
      "Separate the strands into 4 groups of 4. Tie square knots about 20cm down from the ring.",
      "Create a second tier of square knots 10cm below, alternating the strand groupings.",
      "Repeat for a third tier, then gather all strands with a final gathering knot.",
      "Trim the tassel ends evenly and place your potted plant inside."
    ],
    tips: [
      "Test with your pot before trimming the final length.",
      "Add wooden beads between knot tiers for extra boho flair.",
      "Use thicker rope (5-6mm) for heavier pots."
    ]
  },
  {
    slug: "mastering-the-square-knot",
    image: blog3,
    title: "Mastering the Square Knot",
    excerpt: "The square knot is the foundation of macrame. Here's a step-by-step guide to perfecting this essential technique.",
    date: "Mar 1, 2026",
    category: "Tutorial",
    materials: ["4mm practice rope (5m)", "Clipboard or tape", "Patience!"],
    size: "Practice piece",
    difficulty: "Beginner",
    timeEstimate: "30 minutes to learn",
    content: [
      "The square knot is the single most important knot in macrame. Once you master it, you've unlocked the ability to create hundreds of different patterns.",
      "A square knot is made up of two half-hitches — one going left and one going right. The key is consistency and even tension.",
      "Practice on a small sample before starting a big project. Your muscle memory will develop quickly."
    ],
    steps: [
      "Start with 4 strands. The two outer strands are 'working cords' and the two inner strands are 'filler cords'.",
      "Take the left working cord over the fillers and under the right working cord.",
      "Take the right working cord under the fillers and up through the loop on the left.",
      "Pull both working cords to tighten — that's the first half.",
      "Now reverse: right cord over fillers and under left, left cord under fillers and up through the right loop.",
      "Pull tight. You've completed one square knot! The knot should sit flat and symmetrical."
    ],
    tips: [
      "If your knot spirals instead of lying flat, you're doing half-hitches in the same direction — alternate!",
      "Keep filler cords taut for neat, consistent knots.",
      "Count your knots to maintain even patterns."
    ]
  },
  {
    slug: "boho-macrame-wall-decor",
    image: blog4,
    title: "Boho Dreamcatcher Macrame Fusion",
    excerpt: "Combine macrame with dreamcatcher elements for stunning wall decor that brings warmth and good vibes to your space.",
    date: "Feb 25, 2026",
    category: "Inspiration",
    materials: ["3mm cotton rope (30m)", "Metal hoop (25cm)", "Feathers", "Wooden beads", "Scissors", "Fabric glue"],
    size: "25cm diameter hoop, 70cm total with fringe",
    difficulty: "Intermediate",
    timeEstimate: "4-5 hours",
    content: [
      "This fusion project combines the structured beauty of macrame with the whimsical charm of dreamcatchers.",
      "The result is a unique wall piece that captures attention and adds a deeply personal touch to your decor.",
      "Feel free to experiment with colors and materials — dyed rope, crystals, and dried flowers all make beautiful additions."
    ],
    steps: [
      "Wrap the metal hoop completely with rope using a continuous wrapping technique. Secure with glue.",
      "Create a web pattern inside the hoop using half-hitch knots, working from the frame inward.",
      "Attach long strands to the bottom half of the hoop using lark's head knots.",
      "Create alternating square knot patterns with the hanging strands.",
      "Add beads and feathers to selected strands.",
      "Trim the fringe into a curved shape and brush out for a soft finish."
    ],
    tips: [
      "Use a lighter color rope for the wrapping and a contrasting shade for the hanging strands.",
      "Dried eucalyptus or lavender tucked into the design adds a lovely natural touch.",
      "Hang it where it catches gentle air movement for a living, breathing art piece."
    ]
  },
  {
    slug: "macrame-table-runner-patterns",
    image: blog5,
    title: "Macrame Table Runner Patterns",
    excerpt: "Elevate your dining table with handcrafted macrame table runners. Perfect for special occasions and everyday beauty.",
    date: "Feb 20, 2026",
    category: "Patterns",
    materials: ["3mm cotton rope (100m)", "Pins", "Foam board or cork mat", "Measuring tape", "Scissors"],
    size: "30cm wide × 150cm long",
    difficulty: "Intermediate",
    timeEstimate: "8-10 hours",
    content: [
      "A macrame table runner is a statement piece that transforms your dining experience. It's a larger project that rewards patience with stunning results.",
      "This pattern uses a combination of square knots and half-hitch knots to create a geometric diamond design.",
      "The runner is worked flat on a board, which helps keep the pattern even and the edges straight."
    ],
    steps: [
      "Cut 40 strands of rope, each 5m long. Pin them side by side to the foam board.",
      "Work rows of square knots, alternating to create a diamond lattice pattern.",
      "Every 10cm, create a row of diagonal half-hitch knots to add visual interest.",
      "Continue the pattern until the runner reaches your desired length.",
      "Create matching fringe on both ends by brushing out 15cm of rope.",
      "Remove from the board and gently steam or press to set the shape."
    ],
    tips: [
      "This is a great project for binge-watching — the repetitive pattern is meditative once you get going.",
      "Machine wash on gentle cycle and lay flat to dry.",
      "Use unbleached cotton for a rustic look, or white cotton for a more refined aesthetic."
    ]
  },
  {
    slug: "tiny-treasures-macrame-keychains",
    image: blog6,
    title: "Tiny Treasures: Macrame Keychains",
    excerpt: "Small projects, big impact. Learn to make adorable macrame keychains — great for gifts and craft markets.",
    date: "Feb 15, 2026",
    category: "DIY",
    materials: ["2mm cotton cord (2m per keychain)", "Keychain ring", "Small beads (optional)", "Scissors", "Lighter or tape"],
    size: "5-8cm long (excluding ring)",
    difficulty: "Beginner",
    timeEstimate: "20-30 minutes each",
    content: [
      "Macrame keychains are the perfect quick project. They make wonderful handmade gifts and are great sellers at craft markets.",
      "In this tutorial, we'll make three different designs: a simple tassel, a mini wall hanging, and a knotted bar pattern.",
      "These tiny treasures use minimal materials and can be made in any color to match someone's style."
    ],
    steps: [
      "Cut 4 strands of cord, each 50cm long. Thread through the keychain ring and fold in half.",
      "Create a gathering knot just below the ring.",
      "For the tassel design: simply trim and brush out the ends.",
      "For the mini wall hanging: tie 3-4 rows of alternating square knots, then trim into a V-shape.",
      "For the knotted bar: create a continuous spiral of half-hitches for a twisted effect.",
      "Seal the cord ends with a lighter or tape to prevent fraying."
    ],
    tips: [
      "Use colored cord for vibrant designs — dip-dyed effects look amazing!",
      "Batch-make these for gift-giving occasions.",
      "Add a small initial bead for a personalized touch."
    ]
  }
];
