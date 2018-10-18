describe("Sum", function() {

    it("works as intented", function() {
      expect(5).toBe(sum(1)(4))
    });

    it("as intended, it works", function() {
      expect(11).toBe(sum(15)(-4))
    });

    it("indeed, work it does", function() {
      expect(18446744073709551615).toBe(sum(18446744073709551613)(2))
    });
    
    it("apparently it does work", function() {
      expect(0).toBe(sum(-100500)(100500))
    }); 

    it("works fine", function() {
      expect(34503).toBe(sum(12891)(21612))
    })
});