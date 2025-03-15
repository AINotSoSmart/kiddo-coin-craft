import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export function SecuritySetup({ onSetup }: { onSetup: (questions: any[]) => void }) {
  const [questions, setQuestions] = useState([
    { question: '', answer: '' },
    { question: '', answer: '' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.some(q => !q.question || !q.answer)) {
      toast({
        title: "Incomplete Setup",
        description: "Please fill in all questions and answers",
        variant: "destructive",
      });
      return;
    }
    onSetup(questions);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Setup Parent Access</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="space-y-2">
              <Label>Security Question {i + 1}</Label>
              <Input
                placeholder="Enter your question"
                value={q.question}
                onChange={e => {
                  const newQuestions = [...questions];
                  newQuestions[i].question = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="bg-white/70"
              />
              <Input
                placeholder="Enter your answer"
                value={q.answer}
                onChange={e => {
                  const newQuestions = [...questions];
                  newQuestions[i].answer = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="bg-white/70"
              />
            </div>
          ))}
          <Button type="submit" className="w-full">Set Security Questions</Button>
        </form>
      </CardContent>
    </Card>
  );
}