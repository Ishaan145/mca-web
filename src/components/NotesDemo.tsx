import { useState, useEffect } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export const NotesDemo = () => {
  const { fetchNotes, createNote, updateNote, deleteNote, loading, error } = useNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const loadNotes = async () => {
    const data = await fetchNotes();
    if (data) {
      setNotes(data);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    const note = await createNote(newTitle, newContent);
    if (note) {
      setNotes([note, ...notes]);
      setNewTitle('');
      setNewContent('');
      toast({
        title: "Success",
        description: "Note created successfully"
      });
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content || '');
  };

  const handleUpdate = async (id: string) => {
    const updated = await updateNote(id, { 
      title: editTitle, 
      content: editContent 
    });
    
    if (updated) {
      setNotes(notes.map(note => 
        note.id === id ? updated : note
      ));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Note updated successfully"
      });
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteNote(id);
    if (success) {
      setNotes(notes.filter(note => note.id !== id));
      toast({
        title: "Success",
        description: "Note deleted successfully"
      });
    }
  };

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive"
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Backend Demo - Notes App</h1>
        <p className="text-muted-foreground">Your Supabase backend is connected! Try creating, editing, and deleting notes.</p>
      </div>

      {/* Create Note Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Note title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            placeholder="Note content..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <Button 
            onClick={handleCreate} 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Note'}
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No notes yet. Create your first note above!</p>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-6">
                {editingId === note.id ? (
                  <div className="space-y-4">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleUpdate(note.id)}
                        disabled={loading}
                      >
                        Save
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                    {note.content && (
                      <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                        {note.content}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(note.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startEdit(note)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(note.id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};