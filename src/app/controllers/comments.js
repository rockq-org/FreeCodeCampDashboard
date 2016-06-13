'use strict';

/**
 * Module dependencies.
 */

var async = require('co').wrap;

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  req.comment = req.article.comments
    .filter(comment => comment.id === id)
    .reduce(c => c);

  if (!req.comment) return next(new Error('Comment not found'));
  next();
};

/**
 * Create comment
 */

exports.create = async(function* (req, res) {
  const article = req.article;
  yield article.addComment(req.user, req.body);
  res.redirect('/articles/' + article.id);
});

/**
 * Delete comment
 */

exports.destroy = async(function* (req, res) {
  yield req.article.removeComment(req.params.commentId);
  req.flash('info', 'Removed comment');
  res.redirect('/articles/' + req.article.id);
});
