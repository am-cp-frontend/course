describe("Rook", function() {

    it("Test #1", function() {
      rook.moveToCenter();
      rook.setX(101)
      rook.setY(2140)
      expect(101).toBe(rook.currentX);
      expect(2140).toBe(rook.currentY)
    });

    it("Test #2", function() {  
      rook.moveToCenter();
      expect(0).toBe(rook.currentX);
      expect(0).toBe(rook.currentY)
    });

    it("Test #3", function() {
        rook.setX(1234).setY(5678)
        expect(1234).toBe(rook.currentX);
        expect(5678).toBe(rook.currentY)
    });
    
    it ("Test #4", function() {
        rook.setX(1234).setY(5678).moveToCenter()
        expect(0).toBe(rook.currentX);
        expect(0).toBe(rook.currentY)
    }); 


});