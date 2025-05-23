const { Post, User } = require("../models");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // assuming you set this from token

    // ✅ Make sure user exists (optional but safe)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = await Post.create({
      title,
      content,
      userId, // must be a valid existing user ID
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all posts with author info
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: { model: User, attributes: ['id', 'username', 'email'] },
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    console.error("Get All Posts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get post by ID with author info
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: { model: User, attributes: ['id', 'username', 'email'] },
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update post (only owner)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Not the post owner" });
    }

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete post (only owner)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Not the post owner" });
    }

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
