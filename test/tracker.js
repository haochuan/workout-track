import mongoose from "mongoose";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../backend/server';
import moment from 'moment';

import Tracker from '../backend/models/Tracker';


let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Tracker Test Suites', () => {
    before((done) => { //Before each test we empty the database
        Tracker.remove({}, (err) => { 
           done();         
        });     
    });
  /*
  * Test the /GET /api/tracker
  */
  describe('GET /api/tracker', () => {
    it('it should GET all the trackers', (done) => {
      chai.request(server)
      .get('/api/tracker')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal('SUCCESS');
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(0);
        done();
      });
    });
  });

    /*
    * Test the /POST /api/tracker
    */
    describe('POST /api/tracker', () => {
      it('it should not create tracker without required info', (done) => {
        let tracker = {};
        chai.request(server)
          .post('/api/tracker')
          .send(tracker)
          .end((err, res) => {
              res.should.have.status(500);
            done();
          });
      });

      it('it should create tracker with required info', (done) => {
        let tracker = {
          "setOrder": 1,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b923"
        };
        chai.request(server)
          .post('/api/tracker')
          .send(tracker)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            res.body.data.setOrder.should.equal(tracker.setOrder);
            res.body.data.reps.should.equal(tracker.reps);
            res.body.data.weights.should.equal(tracker.weights);
            res.body.data.level.should.equal(1);
            res.body.data.exerciseId.should.equal(tracker.exerciseId);
            res.body.data.userId.should.equal(tracker.userId);
            done();
          });
      });

      it('it should not create tracker with same exerciseId and setOrder', (done) => {
        let tracker = {
          "setOrder": 1,
          "reps": 5,
          "weights": 120, 
          "level": 1,
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b923"
        };
        chai.request(server)
          .post('/api/tracker')
          .send(tracker)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });

      it('it should create tracker with different setOrder but same exerciseId', (done) => {
        let tracker = {
          "setOrder": 2,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b924"
        };
        chai.request(server)
          .post('/api/tracker')
          .send(tracker)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            res.body.data.setOrder.should.equal(tracker.setOrder);
            res.body.data.reps.should.equal(tracker.reps);
            res.body.data.weights.should.equal(tracker.weights);
            res.body.data.level.should.equal(1);
            res.body.data.exerciseId.should.equal(tracker.exerciseId);
            res.body.data.userId.should.equal(tracker.userId);
            done();
          });
      });

      it('it should create tracker with different exerciseId but same setOrder', (done) => {
        let tracker = {
          "setOrder": 1,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b931"
        };
        chai.request(server)
          .post('/api/tracker')
          .send(tracker)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            res.body.data.setOrder.should.equal(tracker.setOrder);
            res.body.data.reps.should.equal(tracker.reps);
            res.body.data.weights.should.equal(tracker.weights);
            res.body.data.level.should.equal(1);
            res.body.data.exerciseId.should.equal(tracker.exerciseId);
            res.body.data.userId.should.equal(tracker.userId);
            done();
          });
      });
    });

    /*
    * Test the /GET /api/tracker/:trackerId
    */
    describe('GET /api/tracker/:trackerId', () => {
      it('it should GET one tracker with the trackerId', (done) => {
        let newTracker = new Tracker({
          "setOrder": 1,
          "reps": 5,
          "weights": 120, 
          "level": 1,
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b911"
        });

        newTracker.save((err, tracker) => {
          chai.request(server)
          .get('/api/tracker/' + tracker.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            res.body.data.setOrder.should.equal(tracker.setOrder);
            res.body.data.reps.should.equal(tracker.reps);
            res.body.data.weights.should.equal(tracker.weights);
            res.body.data.level.should.equal(1);
            res.body.data._id.should.equal(tracker.id);
            res.body.data.exerciseId.should.equal(tracker.exerciseId.toString());
            res.body.data.userId.should.equal(tracker.userId.toString());
            done();
          });
        });
      });

      it('it should GET 404 with the invalid trackerId', (done) => {
        chai.request(server)
        .get('/api/tracker/' + "587d93fdf4864eaf9cd8b930")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });

    /*
    * Test the /PUT /api/tracker/:trackerId
    */
    describe('PUT /api/tracker/:trackerId', () => {
      let updateInfo = {
        "setOrder": 1,
        "reps": 6,
        "weights": 150, 
        "level": 5
      };

      it('it should UPDATE one tracker with the workoutId', (done) => {
        let newTracker = new Tracker({
          "setOrder": 1,
          "reps": 5,
          "weights": 120, 
          "level": 1,
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b926"
        });
        newTracker.save((err, tracker) => {
          chai.request(server)
          .put('/api/tracker/' + tracker.id)
          .send(updateInfo)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            res.body.data.setOrder.should.equal(updateInfo.setOrder);
            res.body.data.reps.should.equal(updateInfo.reps);
            res.body.data.weights.should.equal(updateInfo.weights);
            res.body.data.level.should.equal(updateInfo.level);
            res.body.data._id.should.equal(tracker.id);
            res.body.data.exerciseId.should.equal(tracker.exerciseId.toString());
            res.body.data.userId.should.equal(tracker.userId.toString());
            done();
          });
        });
      });

      it('it should GET 404 with the invalid trackerId', (done) => {
        chai.request(server)
        .put('/api/tracker/' + "587d93fdf4864eaf9cd8b930")
        .send(updateInfo)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });

    /*
    * Test the /DELETE /api/tracker/:trackerId
    */
    describe('DELETE /api/tracker/:trackerId', () => {
      it('it should DELETE one tracker with the workoutId', (done) => {
        let newTracker = new Tracker({
          "setOrder": 1,
          "reps": 5,
          "weights": 120, 
          "level": 1,
          "userId": "587d93fdf4864eaf9cd8b923",
          "exerciseId": "687d93fdf4864eaf9cd8b927"
        });
        newTracker.save((err, tracker) => {
          chai.request(server)
          .delete('/api/tracker/' + tracker.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('ok', 1);
            res.body.data.should.have.property('n', 1);
            done();
          });
        });
      });

      it('it should GET 404 with the invalid trackerId', (done) => {
        chai.request(server)
        .delete('/api/tracker/' + "587d93fdf4864eaf9cd8b944")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });
});