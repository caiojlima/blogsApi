const categoryOptions = (PostCategories) => ({
  as: 'posts',
  through: PostCategories,
  foreignKey: 'categoryId',
  otherKey: 'postId',
});

const postOptions = (PostCategories) => ({
  as: 'categories',
  through: PostCategories,
  foreignKey: 'postId',
  otherKey: 'categoryId',
});

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  }, { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, postOptions(PostCategory));

    models.Category.belongsToMany(models.BlogPost, categoryOptions(PostCategory));
  };

  return PostCategory;
};
