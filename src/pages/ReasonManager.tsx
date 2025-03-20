
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Edit, 
  Plus, 
  Check, 
  X,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Define our Reason type
interface Reason {
  id: string;
  text: string;
}

const ReasonManager: React.FC = () => {
  // State for managing reasons
  const [reasons, setReasons] = useState<Reason[]>(() => {
    const savedReasons = localStorage.getItem('bartenderReasons');
    return savedReasons ? JSON.parse(savedReasons) : [
      { id: '1', text: 'Out of ingredients' },
      { id: '2', text: 'Customer changed mind' },
      { id: '3', text: 'Equipment malfunction' }
    ];
  });
  
  // State for new reason input
  const [newReason, setNewReason] = useState('');
  
  // State for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  // Save to localStorage whenever reasons change
  useEffect(() => {
    localStorage.setItem('bartenderReasons', JSON.stringify(reasons));
  }, [reasons]);
  
  // Handler for adding a new reason
  const handleAddReason = () => {
    if (newReason.trim() === '') {
      toast.error('Please enter a reason');
      return;
    }
    
    const newReasonObj: Reason = {
      id: Date.now().toString(),
      text: newReason.trim()
    };
    
    setReasons(prev => [...prev, newReasonObj]);
    setNewReason('');
    toast.success('Reason added');
  };
  
  // Handler for deleting a reason
  const handleDeleteReason = (id: string) => {
    setReasons(prev => prev.filter(reason => reason.id !== id));
    toast.success('Reason deleted');
  };
  
  // Start editing a reason
  const handleStartEdit = (reason: Reason) => {
    setEditingId(reason.id);
    setEditText(reason.text);
  };
  
  // Save edited reason
  const handleSaveEdit = () => {
    if (editText.trim() === '') {
      toast.error('Reason cannot be empty');
      return;
    }
    
    setReasons(prev => 
      prev.map(reason => 
        reason.id === editingId 
          ? { ...reason, text: editText.trim() } 
          : reason
      )
    );
    
    setEditingId(null);
    toast.success('Reason updated');
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  // Move reason up in the list
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const newReasons = [...reasons];
    [newReasons[index - 1], newReasons[index]] = [newReasons[index], newReasons[index - 1]];
    setReasons(newReasons);
  };
  
  // Move reason down in the list
  const handleMoveDown = (index: number) => {
    if (index === reasons.length - 1) return;
    
    const newReasons = [...reasons];
    [newReasons[index], newReasons[index + 1]] = [newReasons[index + 1], newReasons[index]];
    setReasons(newReasons);
  };
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center bg-green-50 dark:bg-teal-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-2 rounded-full bg-teal-200 text-teal-700 dark:bg-teal-800 dark:text-teal-200 text-xs font-medium">
            MANAGEMENT
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-teal-900 dark:text-teal-100">Cancellation Reasons</h1>
          <p className="text-teal-700 dark:text-teal-300 max-w-md mx-auto">
            Manage the list of reasons why a bartender might cancel an order.
          </p>
        </div>
        
        <Card className="overflow-hidden border backdrop-blur-sm bg-white/90 dark:bg-teal-800/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Input
                placeholder="Add a new reason..."
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddReason();
                }}
                className="rounded-md"
              />
              <Button
                onClick={handleAddReason}
                className="rounded-md bg-teal-600 hover:bg-teal-700"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator className="mb-6 bg-teal-200 dark:bg-teal-700" />
            
            <ScrollArea className="h-[500px] pr-4">
              <AnimatePresence>
                {reasons.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8 text-teal-600 dark:text-teal-300"
                  >
                    <Settings className="mx-auto h-12 w-12 text-teal-400 dark:text-teal-500 mb-3" />
                    <p>No reasons added yet.</p>
                    <p className="text-sm">Add your first reason above.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {reasons.map((reason, index) => (
                      <motion.div
                        key={reason.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        layout
                        className="reason-card bg-white dark:bg-teal-800 border-teal-200 dark:border-teal-700"
                      >
                        {editingId === reason.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit();
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                              className="rounded-md"
                            />
                            <Button 
                              onClick={handleSaveEdit} 
                              size="icon" 
                              variant="ghost"
                              className="hover:bg-teal-100 dark:hover:bg-teal-700"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button 
                              onClick={handleCancelEdit} 
                              size="icon" 
                              variant="ghost"
                              className="hover:bg-teal-100 dark:hover:bg-teal-700"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-teal-900 dark:text-teal-100">{reason.text}</span>
                            <div className="flex items-center space-x-1">
                              <Button
                                onClick={() => handleMoveUp(index)}
                                size="icon"
                                variant="ghost"
                                disabled={index === 0}
                                className="h-8 w-8 hover:bg-teal-100 dark:hover:bg-teal-700"
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleMoveDown(index)}
                                size="icon"
                                variant="ghost"
                                disabled={index === reasons.length - 1}
                                className="h-8 w-8 hover:bg-teal-100 dark:hover:bg-teal-700"
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleStartEdit(reason)}
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:bg-teal-100 dark:hover:bg-teal-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteReason(reason.id)}
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-destructive hover:bg-teal-100 dark:hover:bg-teal-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReasonManager;

