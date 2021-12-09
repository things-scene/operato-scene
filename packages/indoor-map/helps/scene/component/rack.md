# rack

The component which is used to display warehouse rack. It can apply the height and layer, and can give a unique ID number in each rack and layer.

## Properties

1. Depth(Number) - The height of one layer when converted to 3D modeling.
2. Shelves(Number) - The number of layer when converted to 3D modeling.
3. Location Pattern(String) - The pattern which is defined when give a unique ID number in the location and layer of rack. Define the pattern of Z(Zone), S(Selection), U(Unit), Sh(Shelf) in {}.
4. Zone(String) - The value of Zone which will be applied to the pattern.
5. Selection(String) - The selection value which will be applied to the pattern.
6. Unit(String) - The Unit value which will be applied to the pattern.
7. Shelf Pattern(String) - The value of Shelf Pattern which will be applied to the pattern.  
   \# - Dynamically apply the number of layer.  
   0 - Fix the number of digits of layers according to the number of 0. (ex. 0 = 0~9 / 00 = 00~99)
