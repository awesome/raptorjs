raptorBuilder.addLoader(function(raptor) {
    raptor.defineCore('files', {
        /**
         * 
         * @param path
         */
        exists: function(path) {
            throw new Error('Not Implemented');
        },
        
        /**
         * 
         */
        joinPaths: function() {
            throw new Error('Not Implemented');
        },
        
        /**
         * 
         * @param path
         * @param encoding
         */
        readFile: function(path, encoding) {
            throw new Error('Not Implemented');
        },
        
        /**
         * 
         * @param path
         * @returns
         */
        isDirectory: function(path) {
            throw new Error('Not Implemented');
        },
        
        /**
         * 
         * @param path
         * @returns
         */
        isFile: function(path) {
            throw new Error('Not Implemented');
        }
    });
});