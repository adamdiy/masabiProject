test-units:
	./node_modules/karma/bin/karma start ./test/karma.conf.js

test-acc:
	./node_modules/protractor/bin/protractor ./test/protractor-conf.js

.PHONY: sass watch sass production test-units test-acc

