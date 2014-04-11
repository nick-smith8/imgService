var fs = require('fs');
var sinon = require('sinon');
var UploadHandler = require('../upload-handler');
var chai = require('chai');
chai.should();

describe('upload', function(){

	it('uploads an image with an email address', function(){

		var req = {
			files: {
				file: {
					name: 'test'
				}
			},
			body: {
				email: 'homeyer@gmail.com'
			}
		};

		var res = {
			render: sinon.stub()
		};

		sinon.stub(fs, 'readFile').yields(null, 'data');
		sinon.stub(fs, 'writeFile');

		UploadHandler.uploadFile(req, res);

		var expected = __dirname.replace('/spec', '') + '/api/2bde1b725ce22615fa158146c42453e2'
		fs.writeFile.firstCall.args[0].should.equal(expected);

		res.render.firstCall.args[0].should.equal('submit');

	});

});
