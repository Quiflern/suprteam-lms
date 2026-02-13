import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Check, ChevronLeft, ChevronRight, Lightbulb, Terminal } from 'lucide-react';
import Link from 'next/link';
import CodeMirror from '@uiw/react-codemirror';
import { rust } from '@codemirror/lang-rust';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from 'next-themes';
import { LocalLearningProgressService } from '@/services/learning-progress.service';
import { useWallet } from '@solana/wallet-adapter-react';

const lessonsData: Record<string, any> = {
  'solana-fundamentals': {
    'lesson-1': {
      id: 'lesson-1',
      title: 'What is Solana?',
      module: 'Introduction to Solana',
      content: `
# What is Solana?

Solana is a high-performance blockchain platform designed for decentralized applications and crypto-currencies. It was founded in 2017 by Anatoly Yakovenko and aims to provide fast, secure, and scalable blockchain solutions.

## Key Features

- **High Speed**: Solana can process up to 65,000 transactions per second
- **Low Cost**: Average transaction fee is less than $0.01
- **Scalability**: Designed to scale with Moore's Law
- **Security**: Uses Proof of History consensus mechanism

## Why Solana?

Solana combines the best features of other blockchains while addressing their limitations:

- Faster than Ethereum
- More decentralized than some alternatives
- Lower fees than most competitors
- Growing ecosystem of dApps and tools

In this course, you'll learn how to build decentralized applications on the Solana blockchain using Rust and the Anchor framework.
      `,
      type: 'content',
      starterCode: '',
      solutionCode: '',
      testCases: [],
    },
    'lesson-3': {
      id: 'lesson-3',
      title: 'Setting up Development Environment',
      module: 'Introduction to Solana',
      content: `
# Setting up Development Environment

In this lesson, you'll set up your development environment for Solana development.

## Prerequisites

- Basic command line knowledge
- Node.js installed (v16+)
- Rust toolchain

## Steps

1. Install Solana CLI
2. Install Rust
3. Install Anchor framework
4. Verify installation

## Challenge

Complete the following code to verify your Solana CLI installation:
      `,
      type: 'challenge',
      starterCode: `// Verify Solana CLI installation
// Complete this function to check if Solana CLI is properly installed

fn check_solana_installation() -> Result<(), String> {
    // TODO: Implement installation check
    // Use std::process::Command to run 'solana --version'
    // Parse the output and verify it contains version information
    
    Ok(())
}

// Test the function
fn main() {
    match check_solana_installation() {
        Ok(_) => println!("✓ Solana CLI is properly installed"),
        Err(e) => println!("✗ Error: {}", e),
    }
}
      `,
      solutionCode: `use std::process::Command;

fn check_solana_installation() -> Result<(), String> {
    let output = Command::new("solana")
        .arg("--version")
        .output()
        .map_err(|e| format!("Failed to execute solana command: {}", e))?;

    if !output.status.success() {
        return Err(format!("Solana command failed: {}", 
            String::from_utf8_lossy(&output.stderr)));
    }

    let version_output = String::from_utf8_lossy(&output.stdout);
    if !version_output.contains("solana-cli") {
        return Err("Solana CLI not properly installed".to_string());
    }

    Ok(())
}

fn main() {
    match check_solana_installation() {
        Ok(_) => println!("✓ Solana CLI is properly installed"),
        Err(e) => println!("✗ Error: {}", e),
    }
}
      `,
      testCases: [
        {
          name: 'Installation Check',
          input: '',
          expectedOutput: '✓ Solana CLI is properly installed',
        },
      ],
    },
  },
};

export function LessonView({ slug, lessonId }: { slug: string; lessonId: string }) {
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const wallet = useWallet();

  const lesson = lessonsData[slug]?.[lessonId] || lessonsData['solana-fundamentals']['lesson-1'];
  const isChallenge = lesson.type === 'challenge';

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      if (code.includes('solana-cli') || code.includes('Solana CLI is properly installed')) {
        setOutput('✓ Solana CLI is properly installed\n\nAll tests passed!');
      } else {
        setOutput('✗ Error: Solana command failed: command not found\n\nPlease complete the implementation.');
      }
      setIsRunning(false);
    }, 1500);
  };

  const handleCompleteLesson = async () => {
    if (!wallet.connected) {
      setOutput('Please connect your wallet to complete the lesson.');
      return;
    }

    try {
      const service = new LocalLearningProgressService();
      await service.completeLesson(
        wallet.publicKey?.toString() || 'user1',
        slug,
        parseInt(lessonId.split('-')[1]) - 1
      );
      setIsCompleted(true);
      setOutput('🎉 Lesson completed! 25 XP awarded.');
    } catch (error) {
      setOutput('Error completing lesson. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/courses/${slug}`}
            className="text-primary-500 hover:text-primary-600"
          >
            <ChevronLeft className="inline-block mr-1" /> Back to Course
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{lesson.module}</Badge>
            {isChallenge && <Badge variant="secondary">Challenge</Badge>}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lesson Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {isChallenge && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Code Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code" className="mb-4">
                <TabsList>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <div className="border rounded-lg overflow-hidden">
                    <CodeMirror
                      value={showSolution ? lesson.solutionCode : code || lesson.starterCode}
                      height="400px"
                      extensions={[rust()]}
                      theme={theme === 'dark' ? githubDark : githubLight}
                      onChange={(value) => setCode(value)}
                      readOnly={showSolution}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="tests">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <h3 className="font-semibold mb-4">Test Cases</h3>
                    <div className="space-y-4">
                      {lesson.testCases.map((testCase: any, index: number) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{testCase.name}</h4>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                          <div className="text-sm">
                            <p className="mb-1">
                              <strong>Expected Output:</strong>
                            </p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                              {testCase.expectedOutput}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-2 mb-4">
                <Button onClick={handleRunCode} disabled={isRunning}>
                  {isRunning ? (
                    <>
                      <span className="animate-spin mr-2">🔄</span> Running...
                    </>
                  ) : (
                    <>
                      <Terminal className="mr-2 h-4 w-4" /> Run Code
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </Button>
                {isCompleted ? (
                  <Button variant="secondary" disabled>
                    <Check className="mr-2 h-4 w-4" /> Completed
                  </Button>
                ) : (
                  <Button onClick={handleCompleteLesson} disabled={!wallet.connected}>
                    <Check className="mr-2 h-4 w-4" /> Mark Complete
                  </Button>
                )}
              </div>

              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <h3 className="font-semibold mb-2">Output</h3>
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                  {output || 'Click "Run Code" to see the output.'}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center">
          <Link
            href={`/courses/${slug}/lessons/lesson-${parseInt(lessonId.split('-')[1]) - 1}`}
            className={`flex items-center gap-2 ${lessonId === 'lesson-1' ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Link>
          <Link
            href={`/courses/${slug}/lessons/lesson-${parseInt(lessonId.split('-')[1]) + 1}`}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div>
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Lesson Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-semibold">Module: {lesson.module}</h3>
              <div className="space-y-2">
                {['Lesson 1: What is Solana?', 'Lesson 2: Solana Architecture', 'Lesson 3: Setting up Development Environment'].map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={`/courses/${slug}/lessons/lesson-${index + 1}`}
                      className={`block p-2 rounded-md transition-colors ${
                        lessonId === `lesson-${index + 1}`
                          ? 'bg-primary-50 dark:bg-primary-900/50 font-medium'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
                      }`}
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple ReactMarkdown implementation for this example
function ReactMarkdown({ children }: { children: string }) {
  const html = children
    .replace(/^# (.*$)/gm, '<h2>$1</h2>')
    .replace(/^## (.*$)/gm, '<h3>$1</h3>')
    .replace(/^### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n\* /g, '<ul><li>')
    .replace(/\n\*\n/g, '</li></ul>');

  return <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />;
}