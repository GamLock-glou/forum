import { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useSessionStore } from '@/features/session';
import { useUserStore } from '@/entities/user';
import { usersApi } from '@/entities/user';
import type { TUser } from '@/entities/user';

interface EditProfileFormProps {
  user: TUser;
}

export const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    address: {
      street: user.address?.street || '',
      suite: user.address?.suite || '',
      city: user.address?.city || '',
      zipcode: user.address?.zipcode || '',
    },
    company: {
      name: user.company?.name || '',
      catchPhrase: user.company?.catchPhrase || '',
      bs: user.company?.bs || '',
    },
  });

  const { updateCurrentUser } = useSessionStore();
  const { updateUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, unknown> || {}),
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUser = {
        ...user,
        ...formData,
        address: formData.address.street ? formData.address : undefined,
        company: formData.company.name ? formData.company : undefined,
      };

      await usersApi.update(user.id, updatedUser);
      
      updateUser(user.id, updatedUser);
      updateCurrentUser(updatedUser);
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: {
        street: user.address?.street || '',
        suite: user.address?.suite || '',
        city: user.address?.city || '',
        zipcode: user.address?.zipcode || '',
      },
      company: {
        name: user.company?.name || '',
        catchPhrase: user.company?.catchPhrase || '',
        bs: user.company?.bs || '',
      },
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Button 
        className="edit-profile-btn"
        onClick={() => setIsEditing(true)}
        variant="primary"
        size="md"
      >
        <Edit size={16} />
        Edit Profile
      </Button>
    );
  }

  return (
    <div className="edit-profile-form">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>Personal Information</h4>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Address</h4>
          
          <div className="form-group">
            <label htmlFor="address.street">Street</label>
            <input
              id="address.street"
              name="address.street"
              type="text"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address.suite">Suite</label>
            <input
              id="address.suite"
              name="address.suite"
              type="text"
              value={formData.address.suite}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address.city">City</label>
            <input
              id="address.city"
              name="address.city"
              type="text"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address.zipcode">Zipcode</label>
            <input
              id="address.zipcode"
              name="address.zipcode"
              type="text"
              value={formData.address.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Company</h4>
          
          <div className="form-group">
            <label htmlFor="company.name">Company Name</label>
            <input
              id="company.name"
              name="company.name"
              type="text"
              value={formData.company.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company.catchPhrase">Catch Phrase</label>
            <input
              id="company.catchPhrase"
              name="company.catchPhrase"
              type="text"
              value={formData.company.catchPhrase}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company.bs">Business</label>
            <input
              id="company.bs"
              name="company.bs"
              type="text"
              value={formData.company.bs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <Button 
            type="button" 
            onClick={handleCancel}
            disabled={isLoading}
            className="cancel-btn"
            variant="secondary"
            size="md"
          >
            <X size={16} />
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="save-btn"
            variant="primary"
            size="md"
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};