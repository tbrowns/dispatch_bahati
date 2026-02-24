import { useState } from "react";
import { addCommentToBlog } from "../lib/firebase";
import { Star, Send, AlertCircle } from "lucide-react";

interface Comment {
  name: string;
  email: string;
  rating: number;
  text: string;
  timestamp: number;
}

interface BlogCommentsProps {
  blogPostId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

const BlogComments = ({
  blogPostId,
  comments,
  onCommentAdded,
}: BlogCommentsProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    if (text.trim().length < 10) {
      setError("Comment must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    const comment: Comment = {
      name: name.trim(),
      email: email.trim(),
      rating,
      text: text.trim(),
      timestamp: Date.now(),
    };

    const success = await addCommentToBlog(blogPostId, comment);

    if (success) {
      setSuccess(true);
      setName("");
      setEmail("");
      setRating(5);
      setText("");
      onCommentAdded();
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError("Failed to submit comment. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="mt-12 pt-12 border-t border-[#2a2a2a]">
      <h3 className="text-2xl font-bold text-white mb-8">
        Comments ({comments.length})
      </h3>

      {/* Comments List */}
      <div className="space-y-6 mb-12">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-[#141414] p-6 rounded-lg border border-[#2a2a2a]"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{comment.name}</h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < comment.rating
                          ? "fill-[#edb88b] text-[#edb88b]"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Comment Form */}
      <div className="bg-[#141414] p-8 rounded-lg border border-[#2a2a2a]">
        <h4 className="text-xl font-bold text-white mb-6">Leave a Comment</h4>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              ✓ Comment submitted successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#edb88b] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#edb88b] transition-colors"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "fill-[#edb88b] text-[#edb88b]"
                        : "text-gray-600 hover:text-[#edb88b]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Text */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Comment * (minimum 10 characters)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts about this blog post..."
              rows={5}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#edb88b] transition-colors resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {text.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#edb88b] hover:bg-[#f5c99d] text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Your name and comment will be visible, but your email will remain
            private.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BlogComments;
