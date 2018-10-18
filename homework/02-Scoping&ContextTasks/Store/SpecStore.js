describe("Store", function() {

    it("stores stuff", function() {
      let store = MakeStore()
      store.append("0");
      store.append("1");
      store.append("0");
      expect("010").toBe(store.getBuffer())
    });

    it("stores non-string values", function() {  
      let store = MakeStore()
      store.append(100500);
      store.append(500100);
      expect("100500500100").toBe(store.getBuffer())
    });

    it("initializes with content if initString is specified", function() {
        let store = MakeStore("initString");
        expect("initString").toBe(store.getBuffer())
    });
    
    it ("can clear itself", function() {
        let store = MakeStore("initString")
        store.append('bla-bla-bla-bla-bla')
        store.clear()
        expect('').toBe(store.getBuffer());
    }); 

    it('if no initString is specified, initializes empty', function() {
        let store = MakeStore()
        expect('').toBe(store.getBuffer());
    })

    it('can store arrays', function() {
        let store = MakeStore("1,2,3,")
        store.append([4, 5])
        expect('1,2,3,4,5').toBe(store.getBuffer());
    })

});