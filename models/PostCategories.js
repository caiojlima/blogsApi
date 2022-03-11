const categoryOptions = (PostCategories) => ({
  as: 'posts',
  through: PostCategories,
  foreignKey: 'categoryId',
  otherKey: 'postId',
});

const postOptions = (PostCategories) => ({
  as: 'category',
  through: PostCategories,
  foreignKey: 'postId',
  otherKey: 'categoryId',
});

module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  }, { timestamps: false, tableName: 'PostCategories' });

  PostCategories.associate = (models) => {
    models.Post.belongsToMany(models.Category, postOptions(PostCategories));

    models.Category.belongsToMany(models.Post, categoryOptions(PostCategories));
  };

  return PostCategories;
};
