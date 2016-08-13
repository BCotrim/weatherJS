describe('Utils', function() {

  describe('TableUtils', function() {
    var table;

    beforeEach(function() {
      table = document.createElement('table');
    });

    describe('#table', function() {
      beforeEach(function() {
        for (var i = 0; i < 5; i++) {
          table.insertRow();
        }
        TableUtils.clearTable(table);
      });

      it('should clear all rows from the table', function() {
        expect(table.rows.length).toBe(0);
      });
    });

    describe('#insertValues', function() {
      var values;

      beforeEach(function() {
        values = ['first', 'second', 'last'];
        TableUtils.insertValues(table, values);
      });

      it('should insert a new row in the table', function() {
        expect(table.rows.length).toBe(1);
      });

      it('should insert all values in the rows', function() {
        var rows =table.rows[0].querySelectorAll('td');
        expect(rows.length).toBe(values.length);
      });

      it('should create a i on the last value with the correct class', function() {
        var classes = table.rows[0].querySelectorAll('td')[2].querySelector('i').getAttribute('class').split(' ');
        expect(classes).toContain(values[2]);
      });
    });
  });

});
