"""Optional artwork maintenance tool; requires Pillow, never used by yarn build."""

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--font', default='/System/Library/Fonts/Supplemental/Arial.ttf')
parser.add_argument('--bold-font', default='/System/Library/Fonts/Supplemental/Arial Bold.ttf')
args = parser.parse_args()

# Work at double resolution for clean type and logo edges.
SCALE = 2
SIZE = (1200 * SCALE, 630 * SCALE)
photo = Image.open(ROOT / 'docs/assets/koolau-range-original.jpg').convert('RGB')
card = ImageOps.fit(photo, SIZE, method=Image.Resampling.LANCZOS, centering=(0.5, 0.68)).convert('RGBA')
overlay = Image.new('RGBA', SIZE)
draw = ImageDraw.Draw(overlay)
for x in range(SIZE[0]):
    # Fade from a solid brand panel into the natural photograph.
    t = min(1, max(0, (x / SCALE - 250) / 750))
    smooth = t * t * (3 - 2 * t)
    alpha = round(248 - 220 * smooth)
    draw.line((x, 0, x, SIZE[1]), fill=(7, 30, 48, alpha))
card = Image.alpha_composite(card, overlay)

logo = Image.open(ROOT / 'public/logo_only.webp').convert('RGBA')
logo.thumbnail((280 * SCALE, 280 * SCALE), Image.Resampling.LANCZOS)
card.alpha_composite(logo, (72 * SCALE, (SIZE[1] - logo.height) // 2))
draw = ImageDraw.Draw(card)

def text(x, y, value, size, color, bold=False):
    font = ImageFont.truetype(args.bold_font if bold else args.font, size * SCALE)
    draw.text((x * SCALE, y * SCALE), value, font=font, fill=color, anchor='lt')

draw.rectangle((416 * SCALE, 177 * SCALE, 419 * SCALE, 213 * SCALE), fill='#DAA069')
text(436, 177, 'DEPARTMENT OF', 16, '#DAA069')
text(436, 201, 'ATMOSPHERIC SCIENCES', 16, '#DAA069')
text(410, 233, 'ATMO', 88, '#FFFFFF', bold=True)
text(410, 322, 'Coalition', 88, '#FFFFFF', bold=True)
text(416, 409, 'University of Hawaiʻi at Mānoa', 27, '#A5D8E0')

card = card.convert('RGB').resize((1200, 630), Image.Resampling.LANCZOS)
card.save(ROOT / 'public/og-atmo-koolau.jpg', quality=90, optimize=True, progressive=True)
