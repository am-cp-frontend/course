describe("Rook", function() {

    it("implements setX and setY", function() {
      rook.moveToCenter();
      rook.setX(101)
      rook.setY(2140)
      expect(101).toBe(rook.currentX);
      expect(2140).toBe(rook.currentY)
    });

    it("implements moveToCenter", function() {  
      rook.moveToCenter();
      expect(0).toBe(rook.currentX);
      expect(0).toBe(rook.currentY)
    });

    it("can chain setX and setY", function() {
        rook.setX(1234).setY(5678)
        expect(1234).toBe(rook.currentX);
        expect(5678).toBe(rook.currentY)
    });
    
    it ("can chain everything", function() {
        rook.setX(1234).setY(5678).moveToCenter()
        expect(0).toBe(rook.currentX);
        expect(0).toBe(rook.currentY)
    }); 
});