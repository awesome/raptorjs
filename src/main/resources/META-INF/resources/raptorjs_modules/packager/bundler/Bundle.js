raptor.defineClass(
    "packager.bundler.Bundle",
    function(raptor) {
        var packager = raptor.packager,
            forEach = raptor.forEach,
            forEachEntry = raptor.forEachEntry,
            crypto = require('crypto');
        
        var Bundle = function(name) {
            this.name = name;
            this.includes = [];
            this.location = "body";
            this.contentType = null;
            
            this._code = undefined;
            this._checksum = undefined;
        };
        
        Bundle.prototype = {
            isInline: function() {
                return false;
            },
            
            addInclude: function(include) {
            
                this.includes.push(packager.createInclude(include));
            },
            
            getIncludes: function() {
                return this.includes;
            },
            
            hasIncludes: function() {
                return this.includes.length !== 0;
            },
            
            getName: function() {
                return this.name;
            },
            
            getKey: function() {
                return this.location + "/" + this.contentType + "/" + this.name;
            },
            
            getLocation: function() {
                return this.location;
            },
            
            setLocation: function(location) {
                this.location = location;
            },
            
            getContentType: function() {
                return this.contentType;
            },
            
            setContentType: function(contentType) {
                this.contentType = contentType;
            },
            
            isJavaScript: function() {
                return this.contentType === 'application/javascript';
            },
            
            isStyleSheet: function() {
                return this.contentType === 'text/css';
            },
            
            forEachInclude: function(callback, thisObj) {
                forEach(this.includes, callback, thisObj);
            },
            
            calculateChecksum: function(code) {
                
                var shasum = crypto.createHash('sha1');
                shasum.update(code || this.readCode());
                return shasum.digest('hex');
            },
            
            readCode: function(context) {
                var output = [];
                this.forEachInclude(function(include) {
                    var code = include.getCode(context);
                    if (code) {
                        output.push(code);    
                    }
                }, this);
                
                return output.join("\n");  
            }
        };
        
        return Bundle;
    });