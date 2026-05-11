// src/components/CommentSection.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, MessageSquare } from 'lucide-react';
import { saveComment, getCommentsByArticleId, formatCommentDate } from '../services/commentService';
import { useAlert } from '../contexts/AlertContext';
import type { Comment } from '../types';

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const { showAlert } = useAlert();

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getCommentsByArticleId(articleId);
        setComments(data);
      } catch (error) {
        console.error('Error loading comments:', error);
        showAlert('Gagal memuat komentar', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [articleId, showAlert]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!content.trim()) {
      showAlert('Komentar tidak boleh kosong', 'error');
      return;
    }

    if (content.length > 500) {
      showAlert('Komentar maksimal 500 karakter', 'error');
      return;
    }

    if (!authorName.trim()) {
      showAlert('Nama tidak boleh kosong', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const id = await saveComment(articleId, authorName, content);

      if (id) {
        // Refresh comments
        const updatedComments = await getCommentsByArticleId(articleId);
        setComments(updatedComments);
        setContent('');
        showAlert('Komentar berhasil dikirim!', 'success');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      if (error instanceof Error) {
        showAlert(error.message, 'error');
      } else {
        showAlert('Gagal mengirim komentar', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="max-w-4xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-lspi-main" />
            <h3 className="text-2xl font-bold text-gray-900">Komentar</h3>
          </div>
          <p className="text-gray-600 text-sm">
            {comments.length} {comments.length === 1 ? 'komentar' : 'komentar'}
          </p>
        </div>

        {/* Comment Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-lg border border-gray-200 p-5 mb-8"
        >
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-900 mb-2">
              Nama Anda
            </label>
            <input
              id="author"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lspi-main focus:border-transparent outline-none transition"
              maxLength={100}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-900 mb-2">
              Komentar
            </label>
            <textarea
              id="comment"
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 500))}
              placeholder="Tulis komentar Anda di sini..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lspi-main focus:border-transparent outline-none transition resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {content.length}/500 karakter
              </p>
              {content.length > 450 && (
                <p className="text-xs text-yellow-600">
                  Mendekati batas karakter
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="inline-flex items-center gap-2 px-6 py-2 bg-lspi-main text-white rounded-lg font-medium hover:bg-lspi-main/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Kirim Komentar
              </>
            )}
          </button>
        </motion.form>

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-6 h-6 text-lspi-main animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada komentar. Jadilah yang pertama!</p>
            </div>
          ) : (
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{comment.authorName}</h4>
                      <p className="text-xs text-gray-500">
                        {formatCommentDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
