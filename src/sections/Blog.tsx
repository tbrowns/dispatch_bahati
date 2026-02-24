import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Calendar, User, Tag, ArrowRight, X } from "lucide-react";
import BlogComments from "../components/BlogComments";

const Blog = () => {
  const { content } = useContent();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [contentRefresh, setContentRefresh] = useState(0);

  // Force refresh content when comment is added
  const handleCommentAdded = () => {
    setContentRefresh((prev) => prev + 1);
  };

  const getSelectedPostData = () => {
    if (!selectedPost) return null;
    return content.blog.items.find((post: any) => post.id === selectedPost);
  };

  const selectedPostData = getSelectedPostData();

  return (
    <section id="blog" className="py-24 bg-[#0a0a0a]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#edb88b] text-sm font-medium mb-3">
            {content.blog.subtitle}
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 max-w-3xl mx-auto">
            {content.blog.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {content.blog.description}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.blog.items.map((post, index) => (
            <article
              key={index}
              onClick={() => setSelectedPost(post.id)}
              className="group card-dark overflow-hidden hover:border-[#edb88b] transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-[#edb88b]/10 to-[#141414] overflow-hidden">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-2 bg-[#edb88b]/20 text-[#edb88b] px-3 py-1 rounded-full text-xs font-medium border border-[#edb88b]/30">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-white mb-3 line-clamp-2 group-hover:text-[#edb88b] transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-[#2a2a2a]">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4 text-[#edb88b]" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-4 h-4 text-[#edb88b]" />
                    {post.author}
                  </div>
                </div>

                {/* Read More Link */}
                <div className="inline-flex items-center gap-2 text-[#edb88b] font-medium text-sm hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        {/* <div className="text-center mt-12">
          <a href="#" className="btn-primary px-8 py-3">
            View All Articles
          </a>
        </div> */}
      </div>

      {/* Blog Post Detail Modal */}
      {selectedPost && selectedPostData && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center py-8 px-4">
            <div className="bg-[#0a0a0a] w-full max-w-4xl rounded-xl border border-[#2a2a2a] relative max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="sticky top-4 right-4 float-right z-10 p-2 bg-[#141414] hover:bg-[#edb88b]/20 rounded-full border border-[#2a2a2a] transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="p-8">
                {/* Featured Image */}
                {selectedPostData.image && (
                  <img
                    src={selectedPostData.image}
                    alt={selectedPostData.title}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                  />
                )}

                {/* Header */}
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 bg-[#edb88b]/20 text-[#edb88b] px-3 py-1 rounded-full text-xs font-medium border border-[#edb88b]/30 mb-4">
                    <Tag className="w-3 h-3" />
                    {selectedPostData.category}
                  </span>

                  <h1 className="font-display font-bold text-4xl text-white mb-4">
                    {selectedPostData.title}
                  </h1>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#edb88b]" />
                      {selectedPostData.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#edb88b]" />
                      {selectedPostData.author}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedPostData.content}
                  </p>
                </div>

                {/* Comments Section */}
                <BlogComments
                  key={contentRefresh}
                  blogPostId={selectedPostData.id}
                  comments={selectedPostData.comments || []}
                  onCommentAdded={handleCommentAdded}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
