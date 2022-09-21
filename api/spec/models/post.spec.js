var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message and date", () => {
    var post = new Post({ message: "some message", datePosted: "2017-05-18T16:00:00Z" });
    fakeDate = new Date("2017-05-18T16:00:00.000Z")
    wrongFakeDate = new Date("2018-05-18T16:00:00.000Z")
    expect(post.message).toEqual("some message");
    expect(post.datePosted).toMatchObject(fakeDate)
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});
