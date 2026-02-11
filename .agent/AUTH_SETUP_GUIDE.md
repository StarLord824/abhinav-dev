# Authentication Setup Guide

## 🔐 Overview

Your authentication system is now configured with **restricted registration** - only pre-approved email addresses can create accounts.

## ✅ What Was Fixed

### 1. **Sign-In Issues Resolved**
- ✅ Added proper `headers` to auth API calls
- ✅ Improved error handling with specific error messages
- ✅ Fixed redirect URLs to `/blogs/admin` after successful login
- ✅ Added autocomplete attributes for better UX

### 2. **Sign-Up Restrictions Implemented**
- ✅ **Email Whitelist**: Only authorized emails can register
- ✅ **Proper Form Handling**: Uses actual form data (not hardcoded values)
- ✅ **Better Error Messages**: Shows specific errors for unauthorized emails
- ✅ **Visual Indicators**: Warning badge showing registration is restricted

### 3. **Allowed Admin Emails**

Currently authorized emails (in `src/app/actions/auth.ts`):
```typescript
const ALLOWED_ADMIN_EMAILS = [
    "shuklaabhinav824@gmail.com",
    "shukla.abhinav@gmail.com",
    // Add more allowed emails here
];
```

## 🚀 How It Works

### Sign-Up Flow (Restricted)

1. **User visits** `/blogs/sign-up`
2. **Enters credentials** (name, email, password)
3. **System checks** if email is in `ALLOWED_ADMIN_EMAILS`
4. **If authorized**:
   - ✅ Creates account in database
   - ✅ Redirects to `/blogs/admin`
5. **If not authorized**:
   - ❌ Shows error: "Registration is restricted. This email is not authorized."
   - User is prompted to sign in instead

### Sign-In Flow

1. **User visits** `/blogs/sign-in`
2. **Enters credentials** (email, password)
3. **System validates** against database
4. **If valid**:
   - ✅ Creates session
   - ✅ Redirects to `/blogs/admin`
5. **If invalid**:
   - ❌ Shows error: "Invalid email or password. Please try again."

## 📝 Key Files Modified

### 1. `src/app/actions/auth.ts`
```typescript
// Whitelist of allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
    "shuklaabhinav824@gmail.com",
    "shukla.abhinav@gmail.com",
];

export async function signInAction(formData: FormData) {
    // ✅ Now includes proper headers
    const response = await auth.api.signInEmail({
        body: { email, password },
        headers: await headers()  // FIXED!
    });
}

export async function signUpAction(formData: FormData) {
    // ✅ Check if email is authorized
    if (!ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase())) {
        throw new Error("Registration is restricted...");
    }
    
    // ✅ Uses actual form data (not hardcoded)
    const response = await auth.api.signUpEmail({
        body: { email, password, name },
        headers: await headers()  // FIXED!
    });
}
```

### 2. `src/app/blogs/(auth)/sign-in/page.tsx`
- ✅ Better error handling
- ✅ Fixed navigation links
- ✅ Added autocomplete attributes
- ✅ Improved error display

### 3. `src/app/blogs/(auth)/sign-up/page.tsx`
- ✅ Shows "Restricted Access" warning
- ✅ Better error messages
- ✅ Success state handling
- ✅ Visual indicators for authorization requirement

### 4. `src/app/blogs/admin/page.tsx`
- ✅ Fixed redirect to `/blogs/sign-in` (updated by you)

## 🎯 Adding New Authorized Emails

To allow a new email to register:

1. **Open** `src/app/actions/auth.ts`
2. **Add email** to the `ALLOWED_ADMIN_EMAILS` array:
   ```typescript
   const ALLOWED_ADMIN_EMAILS = [
       "shuklaabhinav824@gmail.com",
       "shukla.abhinav@gmail.com",
       "newemail@example.com",  // Add here
   ];
   ```
3. **Save** and restart your dev server

## 🧪 Testing

### Test Sign-Up (Authorized Email)
1. Visit `http://localhost:3000/blogs/sign-up`
2. Enter:
   - Name: `Test User`
   - Email: `shuklaabhinav824@gmail.com`
   - Password: `SecurePass123`
3. Click "Create Admin Account"
4. Should redirect to `/blogs/admin`

### Test Sign-Up (Unauthorized Email)
1. Visit `http://localhost:3000/blogs/sign-up`
2. Enter:
   - Name: `Test User`
   - Email: `unauthorized@example.com`
   - Password: `SecurePass123`
3. Click "Create Admin Account"
4. Should show error: "Registration is restricted. This email is not authorized."

### Test Sign-In
1. Visit `http://localhost:3000/blogs/sign-in`
2. Enter your registered credentials
3. Click "Sign In"
4. Should redirect to `/blogs/admin`

## 🔒 Security Features

1. **Email Whitelist**: Only pre-approved emails can register
2. **Password Validation**: Minimum 8 characters required
3. **Duplicate Prevention**: Shows error if email already exists
4. **Session Management**: Proper session handling via better-auth
5. **Protected Routes**: Admin pages require authentication

## 🐛 Troubleshooting

### "Invalid email or password" on sign-in
- ✅ Check if account exists in database
- ✅ Verify password is correct
- ✅ Check database connection
- ✅ View console logs for detailed errors

### "Registration is restricted" error
- ✅ Verify email is in `ALLOWED_ADMIN_EMAILS`
- ✅ Check for typos in email address
- ✅ Email comparison is case-insensitive

### "Account already exists" error
- ✅ Email is already registered
- ✅ Use sign-in instead of sign-up
- ✅ Or use password reset (if implemented)

### Sign-in redirects to sign-in page
- ✅ Check if session is being created
- ✅ Verify database connection
- ✅ Check browser console for errors
- ✅ Clear cookies and try again

## 📊 Database Schema

Your User model (from Prisma schema):
```prisma
model User {
  id            String       @id
  name          String
  email         String    @unique
  password      String
  role          String    @default("USER")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  emailVerified Boolean   @default(false)
  image         String?
  sessions      Session[]
  accounts      Account[]
  posts         Blog[]
}
```

## 🎨 UI Features

### Sign-In Page
- Clean, modern design
- Error display with red border
- Loading state during submission
- Link to sign-up page

### Sign-Up Page
- "Restricted Access" header with shield icon
- Warning message about authorization
- Email field with "(Must be authorized)" label
- Password minimum length indicator
- Success message on account creation
- Yellow warning box explaining restrictions

## 🔄 Flow Diagram

```
User visits /blogs/sign-up
    ↓
Enters credentials
    ↓
Submits form
    ↓
signUpAction() checks email
    ↓
┌─────────────────────────────┐
│ Email in whitelist?         │
└─────────────────────────────┘
    ↓                    ↓
   YES                  NO
    ↓                    ↓
Create account      Show error
    ↓                    ↓
Redirect to      "Registration is
/blogs/admin      restricted..."
```

## 🚀 Next Steps

1. **Test the authentication flow**
2. **Add your email to whitelist** if needed
3. **Create your first admin account**
4. **Start creating blog posts**

## 📝 Notes

- Registration is **intentionally restricted** to prevent unauthorized access
- Only emails in `ALLOWED_ADMIN_EMAILS` can create accounts
- Existing users can always sign in
- All auth errors are logged to console for debugging
- Sessions are managed by better-auth with PostgreSQL

---

**Security Level**: High - Whitelist-based registration
**Auth Provider**: better-auth with email/password
**Database**: PostgreSQL via Prisma
