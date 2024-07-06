# How to add brush
1. Add <name>-brush.js file
2. Create class <name>Brush extends BaseBrush
3. Implement innerDraw
4. Add script tag to index.html ( <script src="app/brushes/<name>-brush.js"></script>)
5. Add button to toolbox by add name to names array.
6. Add <name>Btn.color = ??? and <name>Btn.selectedColor
7. Add the <name>Brush class to buttons in BasePageBoard class.