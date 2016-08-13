describe('Weather', function() {
  describe('#valueChanged', function() {
    beforeEach(function() {
      var element = document.createElement('input');
      element.setAttribute('id', 'location');
      document.body.appendChild(element);

      spyOn(HttpRequest, 'getAsync').and.returnValue(0);
      spyOn(WeatherView, 'setViewDefaults');
      spyOn(WeatherView, 'setViewLoading');
      spyOn(YahooApi, 'getRequestUrl');
    });

    describe('with an empty location value', function() {
      beforeEach(function(done) {
        WeatherJS.valueChanged();
        setTimeout(done, 1000);
      });

      it('should set the default values on the view', function() {
        expect(WeatherView.setViewDefaults).toHaveBeenCalled();
      });

      it('should not query the yahoo api', function() {
        expect(HttpRequest.getAsync).not.toHaveBeenCalled();
      });
    });

    describe('with a location value', function() {
      var MOCK_VALUE = 'VALUE';

      beforeEach(function(done) {
        document.getElementById('location').value = MOCK_VALUE;
        WeatherJS.valueChanged();
        setTimeout(done, 2000);
      });

      it('should not set the default values on the view', function() {
        expect(WeatherView.setViewDefaults).not.toHaveBeenCalled();
      });

      it('should set the Loading view', function() {
        expect(WeatherView.setViewLoading).toHaveBeenCalled();
      });

      it('should get the correct YahooApi request URL', function() {
        expect(YahooApi.getRequestUrl).toHaveBeenCalledWith(MOCK_VALUE);
      });

      it('should query the yahoo api', function() {
        expect(HttpRequest.getAsync).toHaveBeenCalled();
      });
    });

    describe('with a location value changed multiple times', function() {
      var MOCK_VALUE = 'VALUE';

      beforeEach(function(done) {
        document.getElementById('location').value = MOCK_VALUE;
        for(var i = 0; i < 100; i++) {
          WeatherJS.valueChanged();
        }
        setTimeout(done, 2000);
      });

      it('should query the yahoo api only once', function() {
        expect(HttpRequest.getAsync).toHaveBeenCalledTimes(1);
      });
    });
  });
});
