import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export function SecurityCheck({ questions, onVerify }: { 
  questions: { question: string }[], 
  onVerify: (answers: string[]) => boolean 
}) {
  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some(a => !a)) {
      toast({
        title: "Incomplete Answers",
        description: "Please answer all security questions",
        variant: "destructive",
      });
      return;
    }
    
    const isValid = onVerify(answers);
    if (!isValid) {
      toast({
        title: "Invalid Answers",
        description: "Please check your answers and try again",
        variant: "destructive",
      });
      setAnswers(new Array(questions.length).fill(''));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Parent Access Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="space-y-2">
              <Label>{q.question}</Label>
              <Input
                placeholder="Enter your answer"
                value={answers[i]}
                onChange={e => {
                  const newAnswers = [...answers];
                  newAnswers[i] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="bg-white/70"
              />
            </div>
          ))}
          <Button type="submit" className="w-full">Verify</Button>
        </form>
      </CardContent>
    </Card>
  );
}