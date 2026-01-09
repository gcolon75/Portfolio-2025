# 3 Kingdoms Assets

## Current Assets
- ✅ `3KingdomsTitleScreen.png` - Title screen image
- ✅ `3KingdomsMap.JPG` - Game map screenshot
- ✅ `Three Kingdoms.pdf` - Design Concept PDF

## Asset Organization
All assets are referenced in `src/data/projects.js` under the `3kingdoms` project entry.

### Expected Structure
```
/public/assets/projects/3 Kingdoms/
├── 3KingdomsTitleScreen.png       # Title screen (used as first screenshot)
├── 3KingdomsMap.JPG               # Game map (used as second screenshot)
└── Three Kingdoms.pdf             # Complete design concept document
```

## Usage
- **Images**: Displayed in Screenshots section of project detail page
- **PDF**: Displayed as "Design Concept PDF" in Documents & PDFs section

## Notes
- First image is used as card thumbnail when no explicit `cardImage` is set
- Images display with `object-fit: contain` to avoid cropping
