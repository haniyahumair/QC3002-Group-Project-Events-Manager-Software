import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://127.0.0.1:5500' }));    
app.use(express.json());  

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_ANON_KEY);

app.get('/test-supabase', async (req, res) => {
    try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1);
        if (error) {
            console.error('Supabase test error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json({ success: true, data });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { email, password, userData } = req.body;

    if (!email || !password || !userData) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        console.log('Signing up with:', email, userData);

        // Create a new user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: userData }
        });
        console.log('Auth response:', authData, authError);

        if (authError) {
            console.log('Supabase auth error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        // Insert additional user data into the profiles table
        const { error: profileError } = await supabase.from('profiles').insert([{
            id: authData.user.id, // Foreign key reference to users table
            email,
            ...userData
        }]);

        if (profileError) {
            console.log('Supabase profile insert error:', profileError);
            return res.status(400).json({ error: profileError.message });
        }

        res.json({ success: true, user: authData.user });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));