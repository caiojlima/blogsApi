module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: sequelize.fn('now') },
    updated: { type: sequelize.fn('now') },

  }, { createdAt: 'published', updatedAt: 'updated', tableName: 'BlogPosts' });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};