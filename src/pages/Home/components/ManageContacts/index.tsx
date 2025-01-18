import { Input, Modal } from 'antd';
import { useForm } from '@tanstack/react-form';
import { TContact } from '../../../../interface.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, editItem } from '../../../../services';
import styles from './index.module.css';
import { useCallback } from 'react';

const ManageContacts = ({
  contactToEdit,
  toggleCreateContact,
  open,
  handleSelectContact,
}: {
  contactToEdit?: TContact | null;
  toggleCreateContact: (value: boolean) => void;
  open: boolean;
  handleSelectContact: (value: TContact) => void;
}) => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (res) => {
      handleSelectContact(res);
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toggleCreateContact(false);
      form.reset();
    },
  });
  const editMutation = useMutation({
    mutationFn: editItem,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toggleCreateContact(false);
      handleSelectContact(res);
      form.reset();
    },
  });
  const handleCreate = useCallback((value: Omit<TContact, 'id'>) => {
    createMutation.mutate(value);
  }, []);

  const handleEdit = useCallback(
    (value: Omit<TContact, 'id'>) => {
      editMutation.mutate({ ...value, id: String(contactToEdit?.id) });
    },
    [contactToEdit],
  );

  const form = useForm({
    defaultValues: {
      fullName: contactToEdit?.fullName ?? '',
      preferredName: contactToEdit?.preferredName ?? '',
      description: contactToEdit?.description ?? '',
      image: contactToEdit?.image ?? '',
    },
    onSubmit: async ({ value }) => {
      if (contactToEdit) {
        handleEdit(value);
      } else {
        handleCreate(value);
      }
    },
  });

  return (
    <Modal
      destroyOnClose
      open={open}
      footer={null}
      onCancel={() => {
        form.reset();
        toggleCreateContact(false);
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className={styles.inputWrapper}>
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) =>
                !value.length ? 'fullName is required' : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>FullName</label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <div className={styles.inputWrapper}>
          <form.Field
            name="preferredName"
            validators={{
              onChange: ({ value }) =>
                !value.length ? 'Preferred Name is required' : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Preferred Name</label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <div className={styles.inputWrapper}>
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value.length ? 'Description is required' : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Description</label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <div className={styles.inputWrapper}>
          <form.Field
            name="image"
            validators={{
              onChange: ({ value }) =>
                !value.length ? 'image is required' : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Description</label>
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      const file = e.target.files[0]; // Get the uploaded file
                      if (file) {
                        const reader = new FileReader(); // Create a new FileReader instance

                        reader.onload = () => {
                          const base64String = reader.result; // Read the file as a Base64 string
                          field.handleChange(String(base64String));
                        };

                        reader.onerror = () => {
                          console.error('Error reading file.');
                        };

                        reader.readAsDataURL(file); // Read the file as a Data URL (Base64 string)
                      }
                    }
                  }}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <div className={styles.submitWrapper}>
          <button type="submit">
            {contactToEdit ? 'Edit' : 'Create'} Contact
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ManageContacts;
