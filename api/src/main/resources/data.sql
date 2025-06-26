-- Insert default admin user (password: admin123)
-- This will only run if the table is empty
INSERT INTO users (username, email, password, role, enabled) 
SELECT 'admin', 'admin@bank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', true
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- Insert default user (password: user123)
INSERT INTO users (username, email, password, role, enabled) 
SELECT 'user', 'user@bank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', true
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'user'); 