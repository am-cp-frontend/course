describe("Store", function() {

    it("Test #1", function() {
      let store = MakeStore()
      store.append("0");
      store.append("1");
      store.append("0");
      expect("010").toBe(store.getBuffer())
    });

    it("Test #2", function() {  
      let store = MakeStore()
      store.append(100500);
      store.append(500100);
      expect("100500500100").toBe(store.getBuffer())
    });

    it("Test #3", function() {
        let store = MakeStore("initString");
        expect("initString").toBe(store.getBuffer())
    });
    
    it ("Test #4", function() {
        let store = MakeStore("initString")
        store.append('bla-bla-bla-bla-bla')
        store.clear()
        expect('').toBe(store.getBuffer());
    }); 

    it('Test #5', function() {
        let store = MakeStore()
        expect('').toBe(store.getBuffer());
    })

    it('Test #6', function() {
        let store = MakeStore("1,2,3,")
        store.append([4, 5])
        expect('1,2,3,4,5').toBe(store.getBuffer());
    })

});