import mowingImg from "../assets/mowing.webp";
import flowerBedImg from "../assets/flower-beds.webp";
import patioImg from "../assets/patio.webp";
import stoneWallImg from "../assets/stone-wall.webp";
import fallCleanupImg from "../assets/fall-cleanup.webp";
import sodImg from "../assets/sod.webp";
import fertilizationImg from "../assets/fertilization.webp";
import mulchImg from "../assets/mulch.webp";
import snowImg from "../assets/snow.webp";

export type ServiceCategory = "landscape" | "lawn-care";

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  category: ServiceCategory;
  image: string;
  shortTagline: string;
  cardDescription: string;
  intro: string;
  whatItIs: string[];
  ourProcess: ProcessStep[];
  included: string[];
  whyItMatters: string;
  related: string[];
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  landscape: "Landscape & Design",
  "lawn-care": "Lawn Care & Maintenance",
};

export const SERVICE_CATEGORY_DESCRIPTIONS: Record<ServiceCategory, string> = {
  landscape:
    "Custom outdoor spaces designed and built to last — patios, walls, beds, and the structural pieces that turn a yard into a place you actually want to spend time.",
  "lawn-care":
    "The recurring, reliable maintenance that keeps your property looking sharp week after week, season after season.",
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "patio-design",
    title: "Patio Design & Construction",
    category: "landscape",
    image: patioImg,
    shortTagline: "Custom-built outdoor living space",
    cardDescription:
      "Patios bring a yard to life with a place for the whole family and guests to gather outside. Designed and built custom to your space.",
    intro:
      "A well-built patio is the centerpiece of an outdoor living space. We design and construct custom patios in a wide range of materials and layouts so the finished space fits the way your family actually uses the yard.",
    whatItIs: [
      "Custom hardscape installation using flagstone, pavers, natural stone, brick, or poured concrete — selected to match the architecture of your home and the look you want.",
      "Designs ranging from simple back-door patios to multi-tier outdoor living rooms with seat walls, fire features, planters, and integrated paths.",
      "Built on properly prepared sub-base so it stays flat, drains correctly, and holds up to Tennessee weather year after year.",
    ],
    ourProcess: [
      {
        title: "On-site consultation",
        body: "We walk the property with you, talk through how you want to use the space, take measurements, and discuss material and layout options that fit your home and budget.",
      },
      {
        title: "Design & quote",
        body: "We put together a layout and material recommendation along with a clear written quote — no surprises and no upsell pressure.",
      },
      {
        title: "Site prep & excavation",
        body: "We mark utilities, excavate to the right depth, and build a compacted gravel base so the finished patio is level and stable for the long haul.",
      },
      {
        title: "Install & finish",
        body: "Pavers, stone, or concrete go in tight and true. Joints are swept, edges are restrained, and the surrounding grade is restored before we leave.",
      },
      {
        title: "Walk-through",
        body: "We do a final walk-through with you to make sure every detail is right and explain how to care for the new patio over time.",
      },
    ],
    included: [
      "On-site design consultation and material samples",
      "Layout, excavation, and base preparation",
      "Edge restraints and proper drainage detailing",
      "Material installation (pavers, flagstone, natural stone, brick, or concrete)",
      "Joint sand, sealing where appropriate, and final cleanup",
      "Optional add-ons: seat walls, fire pits, steps, lighting rough-ins",
    ],
    whyItMatters:
      "Patios that are rushed or under-built crack, settle, and pool water within a couple of seasons. The base prep is what makes the difference between a patio that lasts five years and one that lasts thirty. We build for thirty.",
    related: ["stone-walls", "flower-beds", "mulch"],
  },
  {
    slug: "stone-walls",
    title: "Stone Wall Installation",
    category: "landscape",
    image: stoneWallImg,
    shortTagline: "Built to anchor your landscape",
    cardDescription:
      "Nothing anchors a landscape like a well-built stone wall — for terracing, retention, or pure curb appeal. Experienced in every wall type.",
    intro:
      "Stone walls are one of the most permanent features in any landscape — when they're built right. We install retaining walls, seat walls, terraces, and decorative walls in natural stone, dry-stack, segmental block, and mortared construction.",
    whatItIs: [
      "Retaining walls that hold back grade so you can flatten a sloped yard, create usable terraces, or stop erosion at the base of a hill.",
      "Free-standing decorative and seat walls that define garden beds, patios, and outdoor rooms.",
      "Built with the right footings, drainage, and structural backfill so the wall stays plumb and never bulges or fails.",
    ],
    ourProcess: [
      {
        title: "Site assessment",
        body: "We evaluate the slope, soil, drainage, and load conditions to recommend the right wall type and the right materials for your situation.",
      },
      {
        title: "Excavation & footing",
        body: "We dig to a proper frost-stable depth and build a compacted base so the wall has a solid foundation underneath it.",
      },
      {
        title: "Drainage detailing",
        body: "Walls fail because of water, not weight. We install drain stone and perforated drain pipe behind every retaining wall to relieve hydrostatic pressure.",
      },
      {
        title: "Stone setting",
        body: "Each course is set tight and level, with proper batter (lean-back) on retaining walls. On natural stone we hand-fit every piece for the best face.",
      },
      {
        title: "Cap & finish",
        body: "We finish with cap stones or coping, restore disturbed grade, and clean up the site.",
      },
    ],
    included: [
      "Wall design and material selection",
      "Excavation, base prep, and structural backfill",
      "Drain stone and drain pipe behind all retaining walls",
      "Geo-grid reinforcement on taller walls where required",
      "Stone or block installation, including caps and coping",
      "Site restoration and haul-off of debris",
    ],
    whyItMatters:
      "We have built every type of wall there is. The structural details that the homeowner never sees — the base, the drainage, the geo-grid — are the things that determine whether the wall is still standing in twenty years. Those details are where we put our attention.",
    related: ["patio-design", "flower-beds", "sod"],
  },
  {
    slug: "flower-beds",
    title: "Flower Bed Installation",
    category: "landscape",
    image: flowerBedImg,
    shortTagline: "Color, structure, and curb appeal",
    cardDescription:
      "Flower beds are a great way to spruce up any yard. They help define your property and bring beauty and color to any landscape.",
    intro:
      "A well-designed flower bed defines a property, brings in seasonal color, and gives the front of your home a finished look. We design and install new beds and refresh existing ones with plantings selected for our Middle Tennessee climate.",
    whatItIs: [
      "Bed design and layout — shaping the bed lines so they flow with your house and lawn.",
      "Plant selection: perennials, annuals, ornamental grasses, shrubs, and small trees chosen for the light, soil, and look you want.",
      "Bed prep, planting, edging, and a finished mulch top for clean, lasting curb appeal.",
    ],
    ourProcess: [
      {
        title: "Design walk-through",
        body: "We walk the property and talk through colors you like, level of maintenance you want, and how the bed needs to function in each season.",
      },
      {
        title: "Bed shaping & soil prep",
        body: "We cut crisp bed lines, remove old turf, and amend the soil so plants get a strong start.",
      },
      {
        title: "Planting",
        body: "Plants are laid out on top of the bed first so you can see the layout, adjusted as needed, then installed at the proper depth and spacing.",
      },
      {
        title: "Edging & mulch",
        body: "We hand-edge the bed to a clean trench edge and finish with a fresh layer of mulch to lock in moisture and tie the look together.",
      },
      {
        title: "Care guidance",
        body: "Before we leave we give you a simple watering and maintenance plan so the new plants establish well in their first season.",
      },
    ],
    included: [
      "Custom bed design and plant recommendations",
      "Removal of existing turf or overgrown plantings",
      "Soil amendment and bed preparation",
      "Plant installation at correct depth and spacing",
      "Hand-cut crisp bed edges",
      "Fresh mulch top and clean-up",
    ],
    whyItMatters:
      "The right plants in the right place make a flower bed look better every year. The wrong plants — or beds that aren't prepped properly — fight you forever. We pick plants that thrive here and prep beds that hold their shape.",
    related: ["mulch", "sod", "patio-design"],
  },
  {
    slug: "mulch",
    title: "Mulch Installation",
    category: "landscape",
    image: mulchImg,
    shortTagline: "Crisp, finished, season-long",
    cardDescription:
      "Crisp, hand-edged mulch beds protect your plants, lock in moisture, and give your property the finished look it deserves all season long.",
    intro:
      "Fresh mulch is the single biggest visual upgrade you can give a property in a weekend. Beyond looks, it protects plant roots, holds in soil moisture, regulates soil temperature, and keeps weeds down.",
    whatItIs: [
      "Bed edging — re-cutting clean, crisp trench edges around every bed and tree ring.",
      "Weed pulling and bed clean-up before any mulch goes down.",
      "Fresh mulch installed at the proper depth (typically 2–3 inches) — not piled too thick, never mounded against tree trunks.",
    ],
    ourProcess: [
      {
        title: "Bed prep",
        body: "We remove leaves, debris, and weeds from every bed and trim back overhanging perennials so the work surface is clean.",
      },
      {
        title: "Hand edging",
        body: "Every bed gets a freshly hand-cut trench edge. This is the single biggest reason a mulch job looks professional instead of homeowner-grade.",
      },
      {
        title: "Mulch installation",
        body: "Mulch is wheel-barrowed in and hand-spread to consistent depth, kept off plant stems and tree trunks, and feathered cleanly to the edge.",
      },
      {
        title: "Final clean-up",
        body: "We blow off all hard surfaces — driveway, walks, patio — and haul away any debris. The property is left cleaner than we found it.",
      },
    ],
    included: [
      "Bed weeding and debris removal",
      "Hand-cut trench edges around every bed",
      "Premium hardwood, dyed, or natural mulch (your choice)",
      "Mulch installed at correct depth",
      "Tree rings and standalone planting rings",
      "Driveways, walks, and patios blown clean before we leave",
    ],
    whyItMatters:
      "Mulch is more than aesthetic. It cuts weed pressure, conserves water, and protects roots from temperature swings. Done annually, it's one of the most cost-effective things you can do for your landscape.",
    related: ["flower-beds", "fertilization", "fall-cleanup"],
  },
  {
    slug: "sod",
    title: "Sod Layouts",
    category: "landscape",
    image: sodImg,
    shortTagline: "Instant, established lawn",
    cardDescription:
      "Nothing makes for a better yard than fresh sod to restart the green look of a property. Partial repairs or full yard installs — we lay it right.",
    intro:
      "Sod gives you an instant, established lawn — no waiting months for seed to fill in, no bare patches washing out in the next rain. We do everything from filling in worn-out areas to full yard installs after construction or grading.",
    whatItIs: [
      "Full sod installs for new builds, regrades, or yards that have lost the battle with weeds.",
      "Partial repairs to fill in damaged sections, equipment ruts, or shaded areas where existing grass has thinned.",
      "Sod selection — typically Bermuda, Zoysia, or Fescue — matched to your sun exposure and how the lawn will be used.",
    ],
    ourProcess: [
      {
        title: "Site evaluation",
        body: "We look at sun, slope, drainage, and existing soil to recommend the right type of sod and the right prep approach.",
      },
      {
        title: "Site prep",
        body: "We remove existing turf and weeds, regrade as needed for proper drainage away from the house, and till and amend the soil.",
      },
      {
        title: "Soil finishing",
        body: "Final grading is smooth and firm — no high spots, no low spots, no soft pockets. This is what separates a sod job that looks great from one that develops birdbaths the first time it rains.",
      },
      {
        title: "Sod laying",
        body: "Sod is laid tight, with seams staggered like brickwork. Edges are cut clean against beds, walks, and driveways.",
      },
      {
        title: "Roll & water",
        body: "Fresh sod is rolled to ensure good soil contact and watered in. We give you a watering schedule for the establishment period.",
      },
    ],
    included: [
      "Sod type recommendation for your specific yard",
      "Removal of existing turf and weeds",
      "Regrading and soil prep",
      "Sod delivery and installation",
      "Seam cutting and clean edge work against beds and hardscapes",
      "Initial roll and watering, plus an establishment care plan",
    ],
    whyItMatters:
      "A great-looking lawn starts under the sod, not on top of it. Soil prep is the single biggest factor in whether new sod knits in fast and stays healthy. We do not skip that step.",
    related: ["fertilization", "mowing", "flower-beds"],
  },
  {
    slug: "mowing",
    title: "Mowing",
    category: "lawn-care",
    image: mowingImg,
    shortTagline: "Reliable, weekly, sharp lines",
    cardDescription:
      "A big part of lawn maintenance is ensuring your lawn is regularly mowed. We know life gets busy, and we are here to help keep your lawn looking fresh.",
    intro:
      "Regular, professional mowing is the backbone of a great-looking yard. We provide weekly and bi-weekly mowing service to residential and commercial properties across Middle Tennessee, with the kind of clean lines and detail work you notice the moment you pull in the driveway.",
    whatItIs: [
      "Recurring mowing service on a fixed schedule that fits your property's growing rate and your preferences.",
      "Cutting at the optimal height for your grass type and the season — tall enough to shade out weeds, short enough to look sharp.",
      "Edges, walks, and beds trimmed and blown off after every visit so the property is finished, not just mowed.",
    ],
    ourProcess: [
      {
        title: "Property walk and quote",
        body: "We walk the property to identify obstacles, confirm bed lines, and quote a flat per-visit rate for the season.",
      },
      {
        title: "Set the schedule",
        body: "We agree on a service day each week (or every other week) so you know exactly when our trucks will be on site.",
      },
      {
        title: "Mowing pattern rotation",
        body: "We rotate mowing direction each visit. This prevents ruts and keeps the grass standing up straight for a uniform look.",
      },
      {
        title: "Trim and edge",
        body: "We string-trim every edge that the mower can't reach and edge along walks, drives, and beds for a clean cut.",
      },
      {
        title: "Blow off and leave",
        body: "Every hard surface — driveway, walks, patio — gets blown clean. We do not leave clippings on your concrete.",
      },
    ],
    included: [
      "Mowing at the correct height for your grass type",
      "Pattern rotation to prevent ruts and matting",
      "String trimming around fences, posts, beds, and obstacles",
      "Edging along walks, drives, and bed lines",
      "Blowing off all hard surfaces",
      "Visual check-in on lawn health each visit",
    ],
    whyItMatters:
      "How a lawn is mowed has more impact on its long-term health than almost anything else. Mowing too short stresses the grass and invites weeds. Dull blades shred the leaf and brown the tips. We mow at the right height with sharp blades — every time.",
    related: ["fertilization", "fall-cleanup", "sod"],
  },
  {
    slug: "fertilization",
    title: "Fertilization",
    category: "lawn-care",
    image: fertilizationImg,
    shortTagline: "Built around your soil and grass type",
    cardDescription:
      "Targeted fertilization keeps your turf vibrant and resilient — built around your soil, your grass type, and the Tennessee growing season.",
    intro:
      "Fertilization helps your lawn look better and grow stronger by improving the nutrients in the soil. A well-fed lawn is a thicker, greener lawn that crowds out weeds on its own.",
    whatItIs: [
      "Multi-step seasonal fertilization program timed to your grass type and the Tennessee growing calendar.",
      "Targeted nutrients — nitrogen, phosphorus, potassium, and micronutrients — applied at the rates the lawn actually needs.",
      "Pre-emergent and post-emergent weed control applications coordinated with the fertilizer schedule for a healthier turf overall.",
    ],
    ourProcess: [
      {
        title: "Lawn assessment",
        body: "We evaluate grass type, soil condition, sun exposure, and existing weed and disease pressure before recommending an approach.",
      },
      {
        title: "Custom program",
        body: "We build a seasonal program — typically 4 to 7 applications per year — sized to your lawn and your goals.",
      },
      {
        title: "Application",
        body: "Each application is calibrated to the square footage of your turf areas, applied evenly with professional equipment, and watered in or timed with rainfall when possible.",
      },
      {
        title: "Weed control",
        body: "Pre-emergent goes down before weed seeds wake up. Post-emergent and spot treatments knock down anything that gets through.",
      },
      {
        title: "Monitor and adjust",
        body: "We watch how the lawn responds across the season and adjust the program if conditions or results call for it.",
      },
    ],
    included: [
      "Seasonal fertilization applications timed to your grass type",
      "Pre-emergent weed control",
      "Post-emergent weed control and spot treatments",
      "Fungicide treatments where needed",
      "Application notes after each visit so you know what was done",
      "Recommendations for mowing height and watering to support results",
    ],
    whyItMatters:
      "A fertilized lawn is a thicker lawn, and a thicker lawn chokes out weeds without needing chemicals to do it. Done consistently for two or three seasons, a good program transforms a tired yard into the best one on the street.",
    related: ["mowing", "sod", "mulch"],
  },
  {
    slug: "fall-cleanup",
    title: "Fall Cleanup",
    category: "lawn-care",
    image: fallCleanupImg,
    shortTagline: "Reset the property for winter",
    cardDescription:
      "Keeps your outdoor space pristine — removing leaves and debris, tidying beds, and prepping your landscape for the season ahead.",
    intro:
      "Fall cleanup resets your property for winter. Removing leaves and debris is not just cosmetic — leaves left on the lawn smother and kill the grass underneath them. We clear the property, tidy the beds, and prep your landscape so it bounces back strong in the spring.",
    whatItIs: [
      "Full-property leaf removal — lawn, beds, hard surfaces, and out-of-the-way corners.",
      "Bed clean-up: cutting back perennials, removing spent annuals, and clearing leaves out of plantings.",
      "Final mowing of the season at the right height to set the lawn up for dormancy.",
    ],
    ourProcess: [
      {
        title: "Schedule the cleanup",
        body: "We typically schedule the main cleanup after the bulk of the leaves have dropped — often late fall — with optional earlier and follow-up visits for heavy properties.",
      },
      {
        title: "Leaf removal",
        body: "We blow leaves out of beds and corners, gather them with mowers and tarps, and haul them away. No piles left at the curb.",
      },
      {
        title: "Bed tidy",
        body: "Perennials are cut back as appropriate for the species, dead annuals are pulled, and any debris is cleared from beds.",
      },
      {
        title: "Final mow",
        body: "We mow the lawn at the right height for winter — short enough to discourage snow mold, long enough to stay healthy.",
      },
      {
        title: "Hard surface clean-up",
        body: "Driveways, walks, and patios are blown clean before we leave.",
      },
    ],
    included: [
      "Leaf removal from lawn, beds, and hard surfaces",
      "Haul-away of all collected leaves and debris",
      "Cut-back of perennials and removal of spent annuals",
      "Final-of-season mowing at the proper height",
      "Bed and edge tidy-up",
      "Hard surface blow-off",
    ],
    whyItMatters:
      "A wet mat of leaves left on the lawn over winter is one of the easiest ways to kill grass. Spending a day on cleanup in the fall saves you from having to repair bare spots in the spring.",
    related: ["mowing", "snow-services", "mulch"],
  },
  {
    slug: "snow-services",
    title: "Snow Services",
    category: "lawn-care",
    image: snowImg,
    shortTagline: "Keep your property moving",
    cardDescription:
      "When Middle Tennessee winters turn sharp, we keep driveways, walks, and entrances clear so your day keeps moving.",
    intro:
      "Middle Tennessee winters are mild most years and sharp some years. When the weather turns, we clear driveways, walks, and entrances so your home or business keeps running normally.",
    whatItIs: [
      "Snow plowing for driveways, parking lots, and access roads.",
      "Hand-shoveling and snow-blowing of walks, steps, and entrances.",
      "Ice melt application on walks, ramps, and high-traffic surfaces.",
    ],
    ourProcess: [
      {
        title: "Pre-season setup",
        body: "We get a list of priorities, walk the property, and mark obstacles so equipment can move safely in low visibility.",
      },
      {
        title: "Storm monitoring",
        body: "We watch incoming weather and pre-position equipment and crews when accumulating snow is in the forecast.",
      },
      {
        title: "Clear the property",
        body: "We plow drives and lots, clear walks and entrances, and pile snow where it won't block sight lines or create melt-and-refreeze hazards.",
      },
      {
        title: "Treat surfaces",
        body: "Ice melt is applied to walks, ramps, and entrances based on the type of storm and the surface temperature.",
      },
      {
        title: "Follow-up",
        body: "We come back as needed during long storms to keep the property clear, not just opened once and forgotten.",
      },
    ],
    included: [
      "Driveway and parking lot plowing",
      "Walk and entrance shoveling or blowing",
      "Ice melt application on walks and entrances",
      "Pile placement that respects sight lines and drainage",
      "Re-clearing during multi-band storms",
      "Pre-season property walk-through",
    ],
    whyItMatters:
      "Snow service is about safety and access — keeping people from slipping at the front door and keeping your day moving. We treat it that way, not as an afterthought.",
    related: ["fall-cleanup", "mowing"],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceDetail[] {
  return SERVICES.filter((s) => s.category === category);
}
