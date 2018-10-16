describe("Sum", function() {

    it("Test #1", function() {
      expect(5).toBe(sum(1)(4))
    });

    it("Test #2", function() {
      expect(11).toBe(sum(15)(-4))
    });

    it("Test #3", function() {
      expect(18446744073709551615).toBe(sum(18446744073709551613)(2))
    });
    
    it ("Test #4", function() {
      expect(0).toBe(sum(-100500)(100500))
    }); 

    it ("Test #5", function() {
      expect(34503).toBe(sum(12891)(21612))
    })
});