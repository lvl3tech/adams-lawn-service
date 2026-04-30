export const SERVED_COUNTIES = [
  "Bedford", "Cannon", "Cheatham", "Coffee", "Davidson", "DeKalb", "Dickson",
  "Franklin", "Giles", "Hickman", "Lawrence", "Lincoln", "Marshall", "Maury",
  "Montgomery", "Moore", "Robertson", "Rutherford", "Sumner", "Warren",
  "Williamson", "Wilson",
] as const;

const CITY_TO_COUNTY: Record<string, string> = {
  "shelbyville": "Bedford",
  "bell buckle": "Bedford",
  "normandy": "Bedford",
  "wartrace": "Bedford",
  "flat creek": "Bedford",

  "woodbury": "Cannon",
  "auburntown": "Cannon",
  "bradyville": "Cannon",

  "ashland city": "Cheatham",
  "kingston springs": "Cheatham",
  "pegram": "Cheatham",
  "pleasant view": "Cheatham",

  "manchester": "Coffee",
  "tullahoma": "Coffee",

  "nashville": "Davidson",
  "antioch": "Davidson",
  "bellevue": "Davidson",
  "berry hill": "Davidson",
  "donelson": "Davidson",
  "forest hills": "Davidson",
  "goodlettsville": "Davidson",
  "hermitage": "Davidson",
  "joelton": "Davidson",
  "madison": "Davidson",
  "old hickory": "Davidson",
  "whites creek": "Davidson",
  "belle meade": "Davidson",
  "oak hill": "Davidson",

  "smithville": "DeKalb",
  "alexandria": "DeKalb",
  "liberty": "DeKalb",
  "dowelltown": "DeKalb",

  "dickson": "Dickson",
  "burns": "Dickson",
  "charlotte": "Dickson",
  "white bluff": "Dickson",
  "vanleer": "Dickson",
  "slayden": "Dickson",

  "winchester": "Franklin",
  "cowan": "Franklin",
  "decherd": "Franklin",
  "estill springs": "Franklin",
  "sewanee": "Franklin",

  "pulaski": "Giles",
  "lynnville": "Giles",
  "minor hill": "Giles",
  "elkton": "Giles",
  "ardmore": "Giles",

  "centerville": "Hickman",
  "lyles": "Hickman",
  "bon aqua": "Hickman",
  "nunnelly": "Hickman",

  "lawrenceburg": "Lawrence",
  "loretto": "Lawrence",
  "ethridge": "Lawrence",
  "st. joseph": "Lawrence",
  "st joseph": "Lawrence",
  "iron city": "Lawrence",
  "leoma": "Lawrence",
  "summertown": "Lawrence",

  "fayetteville": "Lincoln",
  "petersburg": "Lincoln",
  "mulberry": "Lincoln",
  "kelso": "Lincoln",

  "lewisburg": "Marshall",
  "chapel hill": "Marshall",
  "cornersville": "Marshall",
  "belfast": "Marshall",

  "columbia": "Maury",
  "mount pleasant": "Maury",
  "mt pleasant": "Maury",
  "mt. pleasant": "Maury",
  "santa fe": "Maury",
  "culleoka": "Maury",
  "hampshire": "Maury",
  "spring hill": "Maury",

  "clarksville": "Montgomery",

  "lynchburg": "Moore",

  "springfield": "Robertson",
  "adams": "Robertson",
  "cedar hill": "Robertson",
  "coopertown": "Robertson",
  "greenbrier": "Robertson",
  "orlinda": "Robertson",
  "cross plains": "Robertson",

  "murfreesboro": "Rutherford",
  "smyrna": "Rutherford",
  "la vergne": "Rutherford",
  "lavergne": "Rutherford",
  "eagleville": "Rutherford",
  "christiana": "Rutherford",
  "rockvale": "Rutherford",

  "gallatin": "Sumner",
  "hendersonville": "Sumner",
  "portland": "Sumner",
  "westmoreland": "Sumner",
  "cottontown": "Sumner",
  "bethpage": "Sumner",
  "mitchellville": "Sumner",
  "white house": "Sumner",
  "castalian springs": "Sumner",

  "mcminnville": "Warren",
  "centertown": "Warren",
  "morrison": "Warren",
  "viola": "Warren",

  "franklin": "Williamson",
  "brentwood": "Williamson",
  "nolensville": "Williamson",
  "fairview": "Williamson",
  "thompson's station": "Williamson",
  "thompsons station": "Williamson",
  "leiper's fork": "Williamson",
  "leipers fork": "Williamson",
  "college grove": "Williamson",

  "lebanon": "Wilson",
  "mount juliet": "Wilson",
  "mt juliet": "Wilson",
  "mt. juliet": "Wilson",
  "watertown": "Wilson",
  "norene": "Wilson",
};

export function lookupCounty(city: string): string | null {
  if (!city) return null;
  const key = city.trim().toLowerCase().replace(/\s+/g, " ");
  return CITY_TO_COUNTY[key] ?? null;
}

export function normalizeCounty(raw: string): string {
  if (!raw) return "";
  const cleaned = raw.replace(/\s*county\s*$/i, "").trim();
  if ((SERVED_COUNTIES as readonly string[]).includes(cleaned)) return cleaned;
  return "Other";
}

export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  let prefix = "";
  if (digits.length === 11 && digits.startsWith("1")) {
    prefix = "+1 ";
    digits = digits.slice(1);
  } else if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }
  if (digits.length < 4) return `${prefix}(${digits}`;
  if (digits.length < 7) return `${prefix}(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `${prefix}(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export type AddressSuggestion = {
  id: string;
  label: string;
  street: string;
  city: string;
  county: string;
};

type NominatimResult = {
  place_id: number;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    municipality?: string;
    suburb?: string;
    neighbourhood?: string;
    county?: string;
    state?: string;
  };
};

export async function searchAddresses(
  query: string,
  signal?: AbortSignal,
): Promise<AddressSuggestion[]> {
  const q = query.trim();
  if (q.length < 4) return [];
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&limit=6&q=" +
    encodeURIComponent(q + ", Tennessee");
  const res = await fetch(url, { signal, headers: { "Accept-Language": "en" } });
  if (!res.ok) return [];
  const data = (await res.json()) as NominatimResult[];
  return data
    .filter((r) => r.address?.state === "Tennessee")
    .map((r) => {
      const a = r.address || {};
      const street = [a.house_number, a.road].filter(Boolean).join(" ");
      const city =
        a.city || a.town || a.village || a.hamlet || a.municipality || a.suburb || a.neighbourhood || "";
      const county = normalizeCounty(a.county || "");
      return {
        id: String(r.place_id),
        label: r.display_name,
        street: street || r.display_name.split(",")[0].trim(),
        city,
        county,
      };
    })
    .filter((s) => s.street && s.city);
}
