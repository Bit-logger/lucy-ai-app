export interface Topic {
    id: string;
    day: number;
    title: string;
    description: string;
    tasks: string[];
}

export interface CurriculumData {
    python: Topic[];
    dsa: Topic[];
    aptitude: Topic[];
    weeks: Topic[];
}

export const curriculum: CurriculumData = {
    python: [
        // 🔹 LEVEL 1: PYTHON BASICS (Day 1 – Day 10)
        {
            id: 'py1', day: 1, title: 'Python Intro & Setup',
            description: 'Introduction to Python programming language and environment setup.',
            tasks: ['What is Python?', 'Installing Python & VS Code', 'Running first program', 'print()', 'Comments']
        },
        {
            id: 'py2', day: 2, title: 'Variables & Data Types',
            description: 'Understanding variables and fundamental data types.',
            tasks: ['Variables', 'Data types (int, float, string, bool)', 'Type casting']
        },
        {
            id: 'py3', day: 3, title: 'Input & Operators',
            description: 'Handling user input and basic operations.',
            tasks: ['Input from user', 'Operators (arithmetic, comparison, logical)']
        },
        {
            id: 'py4', day: 4, title: 'Control Flow: Conditionals',
            description: 'Making decisions with conditional statements.',
            tasks: ['if, elif, else', 'Nested conditions']
        },
        {
            id: 'py5', day: 5, title: 'Loops: For Loop',
            description: 'Iterating with for loops and range().',
            tasks: ['for loop', 'range()']
        },
        {
            id: 'py6', day: 6, title: 'Loops: While Loop',
            description: 'Iterating with while loops and loop control statements.',
            tasks: ['while loop', 'break, continue, pass']
        },
        {
            id: 'py7', day: 7, title: 'Functions',
            description: 'Defining and using reusable blocks of code.',
            tasks: ['Functions', 'Parameters & return values']
        },
        {
            id: 'py8', day: 8, title: 'Scope & Problem Solving',
            description: 'Understanding variable scope and applying concepts.',
            tasks: ['Scope of variables', 'Simple problem solving']
        },
        {
            id: 'py9', day: 9, title: 'Revision (Day 1–8)',
            description: 'Reviewing and consolidating basic concepts.',
            tasks: ['Revision (Day 1–8)', 'Small coding exercises']
        },
        {
            id: 'py10', day: 10, title: 'Mini Project 1',
            description: 'Applying basics to build a simple application.',
            tasks: ['Mini Project: Number guessing game / Calculator']
        },
        // 🔹 LEVEL 2: CORE PYTHON FOR AI (Day 11 – Day 20)
        {
            id: 'py11', day: 11, title: 'Lists',
            description: 'Working with ordered, mutable collections.',
            tasks: ['Lists (create, access, modify)']
        },
        {
            id: 'py12', day: 12, title: 'List Methods',
            description: 'Manipulating lists with built-in methods and slicing.',
            tasks: ['List methods', 'List slicing']
        },
        {
            id: 'py13', day: 13, title: 'Tuples & Sets',
            description: 'Working with immutable sequences and unique collections.',
            tasks: ['Tuples', 'Sets']
        },
        {
            id: 'py14', day: 14, title: 'Dictionaries',
            description: 'Key-value data structures and operations.',
            tasks: ['Dictionaries', 'Dictionary methods']
        },
        {
            id: 'py15', day: 15, title: 'Strings',
            description: 'Text processing and string manipulation.',
            tasks: ['Strings', 'String methods']
        },
        {
            id: 'py16', day: 16, title: 'List Comprehensions',
            description: 'Concise syntax for creating lists.',
            tasks: ['List comprehensions']
        },
        {
            id: 'py17', day: 17, title: 'Exception Handling',
            description: 'Managing errors and exceptions gracefully.',
            tasks: ['try-except', 'Error handling']
        },
        {
            id: 'py18', day: 18, title: 'Built-in Functions',
            description: 'Utilizing powerful built-in Python functions.',
            tasks: ['Built-in functions (len, sum, max, min)']
        },
        {
            id: 'py19', day: 19, title: 'Revision (Day 11–18)',
            description: 'Reviewing core Python data structures.',
            tasks: ['Revision (Day 11–18)']
        },
        {
            id: 'py20', day: 20, title: 'Mini Project 2',
            description: 'Building a data processing mini-project.',
            tasks: ['Mini Project: Student marks analyzer']
        },
        // 🔹 LEVEL 3: NUMPY & PANDAS (Day 21 – Day 35)
        {
            id: 'py21', day: 21, title: 'NumPy Basics',
            description: 'Introduction to numerical computing with NumPy.',
            tasks: ['What is NumPy?', 'Arrays']
        },
        {
            id: 'py22', day: 22, title: 'NumPy Array Operations',
            description: 'Manipulating array shapes and indexing.',
            tasks: ['Array operations', 'Shape & indexing']
        },
        {
            id: 'py23', day: 23, title: 'NumPy Math',
            description: 'Performing mathematical operations on arrays.',
            tasks: ['Mathematical operations', 'Matrix basics']
        },
        {
            id: 'py24', day: 24, title: 'NumPy Revision',
            description: 'Practicing NumPy concepts.',
            tasks: ['NumPy revision + practice']
        },
        {
            id: 'py25', day: 25, title: 'Pandas Basics',
            description: 'Introduction to data analysis with Pandas.',
            tasks: ['What is Pandas?', 'Series & DataFrames']
        },
        {
            id: 'py26', day: 26, title: 'Reading Data',
            description: 'Loading and inspecting datasets.',
            tasks: ['Reading CSV files', 'Viewing data']
        },
        {
            id: 'py27', day: 27, title: 'Data Cleaning',
            description: 'Preprocessing data and handling missing values.',
            tasks: ['Data cleaning', 'Handling missing values']
        },
        {
            id: 'py28', day: 28, title: 'Filtering & Sorting',
            description: 'Selecting specific data subsets.',
            tasks: ['Filtering & sorting data']
        },
        {
            id: 'py29', day: 29, title: 'Aggregation',
            description: 'Grouping and summarizing data.',
            tasks: ['GroupBy & aggregation']
        },
        {
            id: 'py30', day: 30, title: 'Pandas Revision',
            description: 'Consolidating Pandas knowledge.',
            tasks: ['Pandas revision']
        },
        {
            id: 'py31', day: 31, title: 'Matplotlib Basics',
            description: 'Introduction to data visualization.',
            tasks: ['Matplotlib basics']
        },
        {
            id: 'py32', day: 32, title: 'Plot Types',
            description: 'Creating various types of charts.',
            tasks: ['Line, bar, scatter plots']
        },
        {
            id: 'py33', day: 33, title: 'Seaborn Basics',
            description: 'Statistical data visualization.',
            tasks: ['Seaborn basics']
        },
        {
            id: 'py34', day: 34, title: 'Visualization Practice',
            description: 'Hands-on practice with plotting libraries.',
            tasks: ['Data visualization practice']
        },
        {
            id: 'py35', day: 35, title: 'Mini Project 3',
            description: 'Analyzing a real-world dataset.',
            tasks: ['Mini Project: Analyze a real dataset (CSV)']
        },
        // 🔹 LEVEL 4: PYTHON FOR MACHINE LEARNING (Day 36 – Day 50)
        {
            id: 'py36', day: 36, title: 'ML Introduction',
            description: 'Overview of Machine Learning concepts.',
            tasks: ['What is Machine Learning?', 'Types of ML']
        },
        {
            id: 'py37', day: 37, title: 'Scikit-Learn',
            description: 'Getting started with scikit-learn library.',
            tasks: ['scikit-learn basics']
        },
        {
            id: 'py38', day: 38, title: 'Data Splitting',
            description: 'Preparing data for training and testing.',
            tasks: ['Train-test split']
        },
        {
            id: 'py39', day: 39, title: 'Linear Regression',
            description: 'Predicting continuous values.',
            tasks: ['Linear Regression']
        },
        {
            id: 'py40', day: 40, title: 'Logistic Regression',
            description: 'Binary classification problems.',
            tasks: ['Logistic Regression']
        },
        {
            id: 'py41', day: 41, title: 'KNN Algorithm',
            description: 'K-Nearest Neighbors implementation.',
            tasks: ['KNN algorithm']
        },
        {
            id: 'py42', day: 42, title: 'Model Evaluation',
            description: 'Assessing model performance.',
            tasks: ['Model evaluation (accuracy)']
        },
        {
            id: 'py43', day: 43, title: 'Confusion Matrix',
            description: 'Understanding classification errors.',
            tasks: ['Confusion matrix']
        },
        {
            id: 'py44', day: 44, title: 'Mini ML Project',
            description: 'Building a small ML model.',
            tasks: ['Mini ML project']
        },
        {
            id: 'py45', day: 45, title: 'Decision Trees',
            description: 'Tree-based learning models.',
            tasks: ['Decision Tree']
        },
        {
            id: 'py46', day: 46, title: 'Random Forest',
            description: 'Ensemble learning method.',
            tasks: ['Random Forest']
        },
        {
            id: 'py47', day: 47, title: 'ML Revision',
            description: 'Reviewing ML algorithms and concepts.',
            tasks: ['ML revision']
        },
        {
            id: 'py48', day: 48, title: 'Hyperparameter Tuning',
            description: 'Optimizing model parameters.',
            tasks: ['Hyperparameter tuning (basic)']
        },
        {
            id: 'py49', day: 49, title: 'ML Workflow',
            description: 'Complete end-to-end ML pipeline.',
            tasks: ['End-to-end ML workflow']
        },
        {
            id: 'py50', day: 50, title: 'Final ML Project',
            description: 'Comprehensive Machine Learning project.',
            tasks: ['Final ML Project']
        },
        // 🔹 LEVEL 5: PYTHON FOR AI / DEEP LEARNING (Day 51 – Day 60)
        {
            id: 'py51', day: 51, title: 'Deep Learning Intro',
            description: 'Introduction to Deep Learning and Neural Networks.',
            tasks: ['What is Deep Learning?', 'Neural networks basics']
        },
        {
            id: 'py52', day: 52, title: 'Perceptrons',
            description: 'Understanding the building blocks of neural networks.',
            tasks: ['Perceptron & activation functions']
        },
        {
            id: 'py53', day: 53, title: 'Framework Setup',
            description: 'Setting up TensorFlow or PyTorch.',
            tasks: ['TensorFlow / PyTorch setup']
        },
        {
            id: 'py54', day: 54, title: 'First Neural Network',
            description: 'Building and training a simple neural network.',
            tasks: ['Build first neural network']
        },
        {
            id: 'py55', day: 55, title: 'Training Concepts',
            description: 'Understanding loss functions and optimizers.',
            tasks: ['Loss & optimizer']
        },
        {
            id: 'py56', day: 56, title: 'Image Classification',
            description: 'Classifying images with neural networks.',
            tasks: ['Image classification basics']
        },
        {
            id: 'py57', day: 57, title: 'Model Improvement',
            description: 'Techniques to enhance model performance.',
            tasks: ['Model improvement']
        },
        {
            id: 'py58', day: 58, title: 'Regularization',
            description: 'Preventing overfitting in models.',
            tasks: ['Overfitting & regularization']
        },
        {
            id: 'py59', day: 59, title: 'AI Revision',
            description: 'Reviewing AI and Deep Learning concepts.',
            tasks: ['AI revision']
        },
        {
            id: 'py60', day: 60, title: 'Final AI Project',
            description: 'Capstone project for the AI curriculum.',
            tasks: ['Final AI mini project 🎉']
        }
    ],
    dsa: [
        // 🔹 PHASE 1: BASICS + TIME COMPLEXITY (Days 1–5)
        {
            id: 'dsa1', day: 1, title: 'DSA Intro',
            description: 'Understanding Data Structures & Algorithms.',
            tasks: ['What is DSA?', 'Why DSA matters']
        },
        {
            id: 'dsa2', day: 2, title: 'Time Complexity Basics',
            description: 'Introduction to Big-O notation.',
            tasks: ['Time complexity (Big-O)', 'Best / Worst / Average case']
        },
        {
            id: 'dsa3', day: 3, title: 'Complexity Classes',
            description: 'Understanding O(1) and O(n).',
            tasks: ['Focus: O(1)', 'Focus: O(n)', 'Goal: Understand efficiency']
        },
        {
            id: 'dsa4', day: 4, title: 'Quadratic & Logarithmic',
            description: 'Understanding O(n²) and O(log n).',
            tasks: ['Focus: O(n²)', 'Focus: O(log n)']
        },
        {
            id: 'dsa5', day: 5, title: 'Time Complexity Practice',
            description: 'Review and practice complexity analysis.',
            tasks: ['Analyze simple loops', 'Analyze nested loops', 'Review all complexity classes']
        },
        // 🔹 PHASE 2: ARRAYS & STRINGS (Days 6–15)
        {
            id: 'dsa6', day: 6, title: 'Array Traversal',
            description: 'Basics of iterating through arrays.',
            tasks: ['Traversing arrays', 'Practice problem 1', 'Practice problem 2']
        },
        {
            id: 'dsa7', day: 7, title: 'Array Operations',
            description: 'Insertion and deletion in arrays.',
            tasks: ['Insert elements', 'Delete elements', 'Practice problem 1']
        },
        {
            id: 'dsa8', day: 8, title: 'Min/Max in Arrays',
            description: 'Finding minimum and maximum values.',
            tasks: ['Finding max value', 'Finding min value', 'Optimization techniques']
        },
        {
            id: 'dsa9', day: 9, title: 'Prefix Sum',
            description: 'Understanding the prefix sum technique.',
            tasks: ['Prefix sum concept', 'Range sum queries', 'Practice problem']
        },
        {
            id: 'dsa10', day: 10, title: 'Sliding Window',
            description: 'Introduction to the sliding window pattern.',
            tasks: ['Sliding window (basic)', 'Fixed size window', 'Practice problem']
        },
        {
            id: 'dsa11', day: 11, title: 'String Reversal',
            description: 'Basic string manipulation techniques.',
            tasks: ['Reverse string', 'In-place reversal', 'Practice problem']
        },
        {
            id: 'dsa12', day: 12, title: 'Palindromes',
            description: 'Checking for palindromes in strings.',
            tasks: ['Palindrome check', 'Case sensitivity', 'Practice problem']
        },
        {
            id: 'dsa13', day: 13, title: 'Character Frequency',
            description: 'Counting characters in strings.',
            tasks: ['Character frequency', 'Using arrays/maps for counting', 'Practice problem']
        },
        {
            id: 'dsa14', day: 14, title: 'Anagrams',
            description: 'Checking if two strings are anagrams.',
            tasks: ['Anagram check', 'Sorting method', 'Frequency map method']
        },
        {
            id: 'dsa15', day: 15, title: 'Arrays & Strings Review',
            description: 'Consolidating knowledge of arrays and strings.',
            tasks: ['Review key concepts', 'Solve mixed problems', 'Goal: Problem-solving mindset']
        },
        // 🔹 PHASE 3: RECURSION & BIT BASICS (Days 16–20)
        {
            id: 'dsa16', day: 16, title: 'Recursion Intro',
            description: 'Understanding the concept of recursion.',
            tasks: ['What is recursion?', 'Base case', 'Recursive case']
        },
        {
            id: 'dsa17', day: 17, title: 'Standard Recursion Problems',
            description: 'Classic problems to practice recursion.',
            tasks: ['Factorial', 'Fibonacci sequence', 'Tracing recursion stack']
        },
        {
            id: 'dsa18', day: 18, title: 'Recursion Deep Dive',
            description: 'Understanding how the recursion stack works.',
            tasks: ['Recursion stack visualization', 'Memory usage in recursion', 'Goal: Think recursively']
        },
        {
            id: 'dsa19', day: 19, title: 'Bit Manipulation Basics',
            description: 'Introduction to bitwise operations.',
            tasks: ['Bit manipulation basics', 'AND, OR, XOR', 'Left/Right Shift']
        },
        {
            id: 'dsa20', day: 20, title: 'Bitwise Tricks',
            description: 'Common bitwise hacks and problems.',
            tasks: ['Even/odd using bits', 'Check power of 2', 'Practice problems']
        },
        // 🔹 PHASE 4: LINKED LIST (Days 21–25)
        {
            id: 'dsa21', day: 21, title: 'Linked List Intro',
            description: 'Understanding Singly Linked Lists.',
            tasks: ['Singly linked list structure', 'Node definition', 'Memory allocation']
        },
        {
            id: 'dsa22', day: 22, title: 'LL Operations',
            description: 'Basic operations on Linked Lists.',
            tasks: ['Insert at beginning', 'Insert at end', 'Delete node']
        },
        {
            id: 'dsa23', day: 23, title: 'Reversing LL',
            description: 'Reversing a Linked List iteratively and recursively.',
            tasks: ['Reverse linked list', 'Iterative approach', 'Recursive approach']
        },
        {
            id: 'dsa24', day: 24, title: 'Loop Detection',
            description: 'Detecting cycles in a Linked List.',
            tasks: ['Detect loop (Floyd’s Cycle Finding)', 'Understand pointers clearly']
        },
        {
            id: 'dsa25', day: 25, title: 'LL Review',
            description: 'Mastering dynamic data structures.',
            tasks: ['Review LL operations', 'Goal: Master dynamic data structures']
        },
        // 🔹 PHASE 5: STACK & QUEUE (Days 26–30)
        {
            id: 'dsa26', day: 26, title: 'Stack Basics',
            description: 'Introduction to strict LIFO data structure.',
            tasks: ['Stack push/pop', 'Stack implementation (Array/LL)', 'Stack applications']
        },
        {
            id: 'dsa27', day: 27, title: 'Stack Problems',
            description: 'Solving problems using Stacks.',
            tasks: ['Balanced parentheses', 'Infix to Postfix (concept)', 'Postfix evaluation']
        },
        {
            id: 'dsa28', day: 28, title: 'Queue Basics',
            description: 'Introduction to FIFO data structure.',
            tasks: ['Simple queue', 'Enqueue/Dequeue', 'Queue implementation']
        },
        {
            id: 'dsa29', day: 29, title: 'Advanced Queues',
            description: 'Circular Queues and Deques.',
            tasks: ['Circular queue', 'Deque (Double Ended Queue)', 'Applications']
        },
        {
            id: 'dsa30', day: 30, title: 'Stack & Queue Review',
            description: 'Consolidating knowledge of linear data structures.',
            tasks: ['Review Stack/Queue', 'Compare usage scenarios', 'Goal: Understand data flow']
        },
        // 🔹 PHASE 6: HASHING (Days 31–35)
        {
            id: 'dsa31', day: 31, title: 'Hashing Intro',
            description: 'Understanding Hash Maps and Hash Tables.',
            tasks: ['What is a Hash Map?', 'Hash functions', 'Collisions']
        },
        {
            id: 'dsa32', day: 32, title: 'Hash Map Operations',
            description: 'Using Hash Maps for efficient data access.',
            tasks: ['Insert/Delete/Search', 'Frequency counting', 'Time complexity analysis']
        },
        {
            id: 'dsa33', day: 33, title: 'Duplicate Detection',
            description: 'Using Hashing to find duplicates.',
            tasks: ['Duplicate detection', 'First repeating element', 'Practice problems']
        },
        {
            id: 'dsa34', day: 34, title: 'Two Sum Problem',
            description: 'Solving the classic Two Sum problem.',
            tasks: ['Two-sum problem', 'Naive solution vs Hash Map', 'Optimization']
        },
        {
            id: 'dsa35', day: 35, title: 'Hashing Review',
            description: 'Important for interviews.',
            tasks: ['Review Hashing', 'Space-Time trade-off', 'Goal: Optimize solutions']
        },
        // 🔹 PHASE 7: SEARCHING & SORTING (Days 36–40)
        {
            id: 'dsa36', day: 36, title: 'Linear Search',
            description: 'Basic searching algorithm.',
            tasks: ['Linear search mechanism', 'Complexity analysis', 'When to use']
        },
        {
            id: 'dsa37', day: 37, title: 'Binary Search',
            description: 'Efficient searching on sorted arrays.',
            tasks: ['Binary search logic', 'Iterative vs Recursive', 'Complexity O(log n)']
        },
        {
            id: 'dsa38', day: 38, title: 'Basic Sorting',
            description: 'Simple sorting algorithms.',
            tasks: ['Bubble sort', 'Selection sort', 'Insertion sort']
        },
        {
            id: 'dsa39', day: 39, title: 'Advanced Sorting Concepts',
            description: 'Introduction to efficient sorting.',
            tasks: ['Merge sort (idea only)', 'Divide and Conquer strategy', 'Stability in sorting']
        },
        {
            id: 'dsa40', day: 40, title: 'Search & Sort Review',
            description: 'Understanding the logic behind algorithms.',
            tasks: ['Review searching', 'Review sorting', 'Goal: Efficient thinking']
        },
        // 🔹 PHASE 8: TREES (Days 41–48)
        {
            id: 'dsa41', day: 41, title: 'Tree Basics',
            description: 'Introduction to hierarchical data structures.',
            tasks: ['Binary tree definition', 'Root, Node, Leaf', 'Levels and Height']
        },
        {
            id: 'dsa42', day: 42, title: 'Tree Properties',
            description: 'Understanding properties of Binary Trees.',
            tasks: ['Height of tree', 'Depth of node', 'Full/Complete Binary Tree']
        },
        {
            id: 'dsa43', day: 43, title: 'Tree Traversal: Depth First',
            description: 'Inorder, Preorder, and Postorder traversals.',
            tasks: ['Inorder traversal', 'Preorder traversal', 'Postorder traversal']
        },
        {
            id: 'dsa44', day: 44, title: 'Binary Search Tree (BST)',
            description: 'Introduction to BST properties.',
            tasks: ['BST definition', 'Search in BST', 'Valid BST check']
        },
        {
            id: 'dsa45', day: 45, title: 'Tree Operations',
            description: 'Basic operations on trees.',
            tasks: ['Insert in BST', 'Find min/max in BST', 'Leaf node count']
        },
        {
            id: 'dsa46', day: 46, title: 'Tree Applications',
            description: 'Real-world usage of trees.',
            tasks: ['Trees in AI/ML', 'Trees in Databases', 'Expression trees']
        },
        {
            id: 'dsa47', day: 47, title: 'Tree Practice',
            description: 'Solving tree-based problems.',
            tasks: ['Practice problem 1', 'Practice problem 2', 'Practice problem 3']
        },
        {
            id: 'dsa48', day: 48, title: 'Tree Review',
            description: 'Mastering hierarchical structures.',
            tasks: ['Review Traversals', 'Review BST', 'Goal: Hierarchical thinking']
        },
        // 🔹 PHASE 9: GRAPHS (Days 49–55)
        {
            id: 'dsa49', day: 49, title: 'Graph Intro',
            description: 'Introduction to Graph data structure.',
            tasks: ['Graph definition', 'Vertices and Edges', 'Directed vs Undirected']
        },
        {
            id: 'dsa50', day: 50, title: 'Graph Representation',
            description: 'Adjacency Matrix and Adjacency List.',
            tasks: ['Adjacency Matrix', 'Adjacency List', 'Pros and Cons']
        },
        {
            id: 'dsa51', day: 51, title: 'BFS',
            description: 'Breadth-First Search traversal.',
            tasks: ['BFS algorithm', 'Queue usage in BFS', 'Level order traversal']
        },
        {
            id: 'dsa52', day: 52, title: 'DFS',
            description: 'Depth-First Search traversal.',
            tasks: ['DFS algorithm', 'Stack/Recursion in DFS', 'Path finding']
        },
        {
            id: 'dsa53', day: 53, title: 'Graph Examples',
            description: 'Real-life applications of graphs.',
            tasks: ['Social networks', 'Maps/Navigation', 'Web crawling']
        },
        {
            id: 'dsa54', day: 54, title: 'Graph Practice',
            description: 'Solving basic graph problems.',
            tasks: ['Practice BFS', 'Practice DFS', 'Connected components']
        },
        {
            id: 'dsa55', day: 55, title: 'DSA Final Review',
            description: 'Wrapping up the DSA curriculum.',
            tasks: ['Review Graph basics', 'AI foundations check', 'Goal: Relationship modeling']
        }
    ],
    aptitude: [
        // 🔹 PHASE 1: NUMBERS (Days 1–10)
        {
            id: 'apt1', day: 1, title: 'Number Systems',
            description: 'Introduction to different types of numbers.',
            tasks: ['Natural, Whole, Integers', 'Prime vs Composite', 'Rational vs Irrational']
        },
        {
            id: 'apt2', day: 2, title: 'Divisibility Rules',
            description: 'Rules for checking divisibility quickly.',
            tasks: ['Rules for 2, 3, 4, 5', 'Rules for 6, 8, 9, 11', 'Practice problems']
        },
        {
            id: 'apt3', day: 3, title: 'LCM Basics',
            description: 'Least Common Multiple fundamentals.',
            tasks: ['Finding LCM', 'Prime factorization method', 'Division method']
        },
        {
            id: 'apt4', day: 4, title: 'HCF Basics',
            description: 'Highest Common Factor fundamentals.',
            tasks: ['Finding HCF', 'Relationship between LCM & HCF', 'HCF of fractions']
        },
        {
            id: 'apt5', day: 5, title: 'Remainders',
            description: 'Understanding remainder theorems.',
            tasks: ['Basic remainder concept', 'Negative remainders', 'Practice problems']
        },
        {
            id: 'apt6', day: 6, title: 'Simplification',
            description: 'Solving complex expressions.',
            tasks: ['BODMAS rule', 'Approximation techniques', 'Fractions simplification']
        },
        {
            id: 'apt7', day: 7, title: 'Surds & Indices',
            description: 'Laws of exponents and roots.',
            tasks: ['Laws of indices', 'Rules of surds', 'Comparing surds']
        },
        {
            id: 'apt8', day: 8, title: 'Units Digit',
            description: 'Finding the last digit of powers.',
            tasks: ['Cyclicity of numbers', 'Finding units digit', 'Practice power problems']
        },
        {
            id: 'apt9', day: 9, title: 'Numbers Practice 1',
            description: 'Consolidating number system concepts.',
            tasks: ['Review Divisibility', 'Review LCM/HCF', 'Solve mixed problems']
        },
        {
            id: 'apt10', day: 10, title: 'Numbers Practice 2',
            description: 'Advanced number system problems.',
            tasks: ['Advanced remainder problems', 'Speed calculation drills', 'Goal: Calculation speed']
        },
        // 🔹 PHASE 2: ARITHMETIC (Days 11–25)
        {
            id: 'apt11', day: 11, title: 'Percentages Intro',
            description: 'Basics of percentage calculations.',
            tasks: ['Percentage to fraction', 'Fraction to percentage', 'Percentage increase/decrease']
        },
        {
            id: 'apt12', day: 12, title: 'Percentage Problems',
            description: 'Solving percentage word problems.',
            tasks: ['Population problems', 'Election problems', 'Consumption/Expenditure']
        },
        {
            id: 'apt13', day: 13, title: 'Profit & Loss',
            description: 'Understanding CP, SP, Profit, and Loss.',
            tasks: ['Basic formulas', 'Profit/Loss percentage', 'Discount calculations']
        },
        {
            id: 'apt14', day: 14, title: 'Simple Interest',
            description: 'Calculating simple interest over time.',
            tasks: ['SI formula', 'Principal, Rate, Time', 'Installment problems']
        },
        {
            id: 'apt15', day: 15, title: 'Compound Interest',
            description: 'Understanding the power of compounding.',
            tasks: ['CI formula', 'CI vs SI difference', 'Half-yearly/Quarterly compounding']
        },
        {
            id: 'apt16', day: 16, title: 'Ratio & Proportion',
            description: 'Comparing quantities using ratios.',
            tasks: ['Ratio properties', 'Proportion basics', 'Mean proportion']
        },
        {
            id: 'apt17', day: 17, title: 'Partnership',
            description: 'Ratio applications in business.',
            tasks: ['Investment ratios', 'Profit sharing', 'Sleeping partners']
        },
        {
            id: 'apt18', day: 18, title: 'Averages',
            description: 'Finding the mean of datasets.',
            tasks: ['Average formula', 'Weighted average', 'Average speed']
        },
        {
            id: 'apt19', day: 19, title: 'Mixtures & Alligations',
            description: 'Solving mixture problems.',
            tasks: ['Rule of Alligation', 'Mean value', 'Removing/Replacing liquids']
        },
        {
            id: 'apt20', day: 20, title: 'Time & Work 1',
            description: 'Basics of work and efficiency.',
            tasks: ['Unitary method', 'Efficiency method', 'Man-Days concept']
        },
        {
            id: 'apt21', day: 21, title: 'Time & Work 2',
            description: 'Advanced work problems.',
            tasks: ['Pipes & Cisterns', 'Work & Wages', 'Alternate days work']
        },
        {
            id: 'apt22', day: 22, title: 'Time Speed Distance 1',
            description: 'Basics of motion equations.',
            tasks: ['Relationship T, S, D', 'Unit conversion', 'Average speed']
        },
        {
            id: 'apt23', day: 23, title: 'Trains',
            description: 'Problems on trains crossing objects.',
            tasks: ['Relative speed', 'Crossing pole/platform', 'Two trains crossing']
        },
        {
            id: 'apt24', day: 24, title: 'Boats & Streams',
            description: 'Upstream and downstream motion.',
            tasks: ['Still water speed', 'Stream speed', 'Upstream/Downstream formulas']
        },
        {
            id: 'apt25', day: 25, title: 'Arithmetic Review',
            description: 'Consolidating arithmetic concepts.',
            tasks: ['Review formulas', 'Solve mixed arithmetic', 'Goal: Solve faster']
        },
        // 🔹 PHASE 3: ALGEBRA (Days 26–30)
        {
            id: 'apt26', day: 26, title: 'Algebraic Basics',
            description: 'Introduction to algebraic expressions.',
            tasks: ['Variables & Constants', 'Polynomial basics', 'Degree of polynomial']
        },
        {
            id: 'apt27', day: 27, title: 'Linear Equations',
            description: 'Solving equations with one or two variables.',
            tasks: ['Solving linear equations', 'Word problems on numbers', 'Age problems']
        },
        {
            id: 'apt28', day: 28, title: 'Quadratic Equations',
            description: 'Solving standard quadratic equations.',
            tasks: ['Factorization method', 'Quadratic formula', 'Roots nature']
        },
        {
            id: 'apt29', day: 29, title: 'Inequalities',
            description: 'Understanding greater than/less than relationships.',
            tasks: ['Linear inequalities', 'Solving ranges', 'Number line representation']
        },
        {
            id: 'apt30', day: 30, title: 'Algebraic Identities',
            description: 'Standard algebraic formulas.',
            tasks: ['(a+b)^2, (a-b)^2', 'Difference of squares', 'Cubic identities']
        },
        // 🔹 PHASE 4: GEOMETRY & MENSURATION (Days 31–35)
        {
            id: 'apt31', day: 31, title: 'Lines & Angles',
            description: 'Basics of geometry.',
            tasks: ['Types of angles', 'Parallel lines', 'Transversals']
        },
        {
            id: 'apt32', day: 32, title: 'Triangles',
            description: 'Properties of triangles.',
            tasks: ['Types of triangles', 'Congruence & Similarity', 'Pythagoras theorem']
        },
        {
            id: 'apt33', day: 33, title: 'Circles & Polygons',
            description: 'Properties of circles and n-sided shapes.',
            tasks: ['Circle properties', 'Tangents and Chords', 'Polygon internal angles']
        },
        {
            id: 'apt34', day: 34, title: 'Mensuration 2D',
            description: 'Area and Perimeter calculations.',
            tasks: ['Area of triangle/square', 'Area of circle', 'Perimeter formulas']
        },
        {
            id: 'apt35', day: 35, title: 'Mensuration 3D',
            description: 'Volume and Surface Area calculations.',
            tasks: ['Volume of Cube/Cuboid', 'Cylinder & Cone', 'Sphere properties']
        },
        // 🔹 PHASE 5: DATA INTERPRETATION (Days 36–40)
        {
            id: 'apt36', day: 36, title: 'Tables',
            description: 'Interpreting data from tables.',
            tasks: ['Reading tables', 'Calculation from rows/cols', 'Percentage in tables']
        },
        {
            id: 'apt37', day: 37, title: 'Bar Graphs',
            description: 'Analyzing bar chart data.',
            tasks: ['Single bar graph', 'Double bar graph', 'Trends analysis']
        },
        {
            id: 'apt38', day: 38, title: 'Line Graphs',
            description: 'Analyzing trends over time.',
            tasks: ['Reading line points', 'Slope interpretation', 'Growth rate']
        },
        {
            id: 'apt39', day: 39, title: 'Pie Charts',
            description: 'Circular data representation.',
            tasks: ['Degree to percentage', 'Percentage to degree', 'Sector analysis']
        },
        {
            id: 'apt40', day: 40, title: 'Caselets',
            description: 'Paragraph based data interpretation.',
            tasks: ['Extracting data from text', 'Organizing into table', 'Solving questions']
        },
        // 🔹 PHASE 6: LOGICAL REASONING (Days 41–45)
        {
            id: 'apt41', day: 41, title: 'Series & Coding',
            description: 'Identifying patterns in sequences.',
            tasks: ['Number series', 'Alphabet series', 'Coding-Decoding']
        },
        {
            id: 'apt42', day: 42, title: 'Relations & Direction',
            description: 'Blood relations and spatial reasoning.',
            tasks: ['Family tree analysis', 'Direction sense test', 'Distance calculation']
        },
        {
            id: 'apt43', day: 43, title: 'Seating Arrangement',
            description: 'Linear and circular arrangement problems.',
            tasks: ['Linear seating', 'Circular seating', 'Facing center/outwards']
        },
        {
            id: 'apt44', day: 44, title: 'Syllogisms',
            description: 'Deductive reasoning using logic.',
            tasks: ['Venn diagrams', 'All/Some/None', 'Drawing conclusions']
        },
        {
            id: 'apt45', day: 45, title: 'Final Aptitude Review',
            description: 'Ready for tests.',
            tasks: ['Review all formulas', 'Mock test practice', 'Goal: Ready for placements']
        }
    ],
    weeks: [
        // MONTH 1: Python, Git & Engineering Basics
        {
            id: 'wk1', day: 1, title: 'Python Fundamentals',
            description: 'Syntax, variables, loops, execution flow, debugging mindset.',
            tasks: ['Learn Syntax & Variables', 'Understand Stack & Heap', 'Build: Calculator', 'Build: Number Guessing Game']
        },
        {
            id: 'wk2', day: 2, title: 'Functions & Data Structures',
            description: 'Functions, scope, lists, dicts, mutability, time complexity.',
            tasks: ['Master Functions & Scope', 'Data Structures Deep Dive', 'Build: Student Marks Analyzer', 'Build: To-Do App']
        },
        {
            id: 'wk3', day: 3, title: 'Writing Real Python Code',
            description: 'Modules, imports, file I/O, exceptions, logging.',
            tasks: ['Virtual Environments', 'File I/O & Exceptions', 'Build: File Organizer', 'Build: CSV Processor']
        },
        {
            id: 'wk4', day: 4, title: 'Git & Collaboration',
            description: 'Git internals, branching, PRs, code reviews.',
            tasks: ['Git Internals', 'Branching & Merging', 'Push Month-1 Projects to GitHub', 'Write READMEs']
        },
        // MONTH 2: Data, Text & Embeddings Foundations
        {
            id: 'wk5', day: 5, title: 'Pandas & EDA',
            description: 'Pandas internals, indexing, filtering, joins, EDA.',
            tasks: ['Pandas Deep Dive', 'Data Leakage Intuition', 'Build: Dataset Analysis Notebook', 'Exploratory Analysis']
        },
        {
            id: 'wk6', day: 6, title: 'Data Cleaning',
            description: 'Missing values, outliers, feature engineering, pipelines.',
            tasks: ['Handle Missing Values', 'Feature Engineering', 'Build: Cleaned Dataset', 'Data Pipelines']
        },
        {
            id: 'wk7', day: 7, title: 'Text Processing',
            description: 'Normalization, tokenization, regex, NLP pipelines.',
            tasks: ['Text Normalization', 'Regex Basics', 'Build: Text Cleaning Pipeline', 'NLP Preprocessing']
        },
        {
            id: 'wk8', day: 8, title: 'Embeddings & Similarity',
            description: 'Vectors, cosine similarity, FAISS, embeddings APIs.',
            tasks: ['Embeddings Theory', 'Cosine Similarity', 'Build: Semantic Search Tool', 'OpenAI/HF APIs']
        },
        // MONTH 3: Machine Learning Foundations
        {
            id: 'wk9', day: 9, title: 'ML Basics & Framing',
            description: 'Supervised vs unsupervised, train/test split, use cases.',
            tasks: ['ML vs Rules', 'Train/Test Split', 'Define ML Problem', 'Real-world Use Cases']
        },
        {
            id: 'wk10', day: 10, title: 'Core ML Models',
            description: 'Regression, KNN, Decision Trees, bias, scikit-learn.',
            tasks: ['Linear/Logistic Regression', 'Decision Trees & KNN', 'Build: Regression Model', 'Scikit-learn Pipelines']
        },
        {
            id: 'wk11', day: 11, title: 'Model Evaluation',
            description: 'Accuracy, precision, recall, F1, ROC-AUC, confusion matrix.',
            tasks: ['Evaluation Metrics', 'Confusion Matrix', 'Build: Evaluation Report', 'Error Analysis']
        },
        {
            id: 'wk12', day: 12, title: 'ML Best Practices',
            description: 'Overfitting, bias-variance, tuning, feature importance.',
            tasks: ['Bias-Variance Tradeoff', 'Hyperparameter Tuning', 'Build: ML Mini-Project', 'End-to-end Workflow']
        },
        // MONTH 4: Generative AI & Prompt Engineering
        {
            id: 'wk13', day: 13, title: 'LLM Fundamentals',
            description: 'Transformers, attention, tokens, context windows.',
            tasks: ['Transformer Basics', 'Context Windows', 'Build: Basic Chatbot', 'Inference Tradeoffs']
        },
        {
            id: 'wk14', day: 14, title: 'Prompt Engineering',
            description: 'Chain-of-thought, few-shot, structured outputs.',
            tasks: ['Role-based Prompting', 'Chain-of-Thought', 'Build: Summarizer', 'Prompt Iteration']
        },
        {
            id: 'wk15', day: 15, title: 'GenAI APIs',
            description: 'OpenAI/HF APIs, streaming, rate limits, cost management.',
            tasks: ['API Integration', 'Streaming Responses', 'Build: Resume Reviewer', 'Cost Management']
        },
        {
            id: 'wk16', day: 16, title: 'Responsible AI',
            description: 'Hallucinations, bias, injection, guardrails.',
            tasks: ['Safety Filters', 'Prompt Injection Prevention', 'Build: Constrained Chatbot', 'Output Validation']
        },
        // MONTH 5: RAG, Vector Stores & Agent Frameworks
        {
            id: 'wk17', day: 17, title: 'RAG Fundamentals',
            description: 'RAG vs fine-tuning, chunking, retrieval failures.',
            tasks: ['RAG Concepts', 'Chunking Strategies', 'Build: Chunking Pipeline', 'Metadata Filtering']
        },
        {
            id: 'wk18', day: 18, title: 'Vector Databases',
            description: 'FAISS, Chroma, Pinecone, indexing, ANN search.',
            tasks: ['Vector DB Basics', 'Indexing Strategies', 'Build: Vector Search System', 'Similarity Metrics']
        },
        {
            id: 'wk19', day: 19, title: 'RAG Systems',
            description: 'Retrieval + generation, reranking, RAG evaluation.',
            tasks: ['Context Injection', 'Reranking', 'Build: Document Q&A Bot', 'RAG Evaluation']
        },
        {
            id: 'wk20', day: 20, title: 'Frameworks & Agents',
            description: 'LangChain, CrewAI, tools, function calling.',
            tasks: ['LangChain/CrewAI', 'Tool Calling', 'Build: Multi-step AI Workflow', 'Agent Memory']
        },
        // MONTH 6: Agentic Systems, Production & Capstone
        {
            id: 'wk21', day: 21, title: 'Agentic Workflows',
            description: 'Planning, reasoning, tool orchestration, failure handling.',
            tasks: ['Agent Planning', 'Tool Orchestration', 'Build: Agent Automation', 'Failure Handling']
        },
        {
            id: 'wk22', day: 22, title: 'Evaluation & Optimization',
            description: 'LLM-as-judge, cost, latency, caching.',
            tasks: ['LLM Evaluation', 'Latency Optimization', 'Build: Evaluation Report', 'Caching Strategies']
        },
        {
            id: 'wk23', day: 23, title: 'Production Readiness',
            description: 'FastAPI, logging, monitoring, deployments.',
            tasks: ['FastAPI & Async', 'Logging & Monitoring', 'Build: Production AI Service', 'Deployment']
        },
        {
            id: 'wk24', day: 24, title: 'Capstone Project',
            description: 'System design, integration, documentation, demo.',
            tasks: ['System Design', 'Integration', 'Build: Final Capstone', 'Documentation & Demo']
        }
    ]
};
