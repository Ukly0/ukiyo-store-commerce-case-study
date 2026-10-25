"""Keep original PNG evidence; create smaller, unretouched presentation copies."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'docs/images/runtime'
for source in sorted(root.glob('*.png')):
    with Image.open(source) as image:
        image.convert('RGB').save(source.with_suffix('.webp'), 'WEBP', quality=88, method=6)
        print(source.name, image.size, '->', source.with_suffix('.webp').stat().st_size, 'bytes')
