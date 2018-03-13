class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  attr_reader :password

  has_many :transactions
  has_many :cash_balances
  has_many :leagues, through: :cash_balances

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    self.save
    self.session_token
  end

  def self.random_user
    User.limit(1).order("RANDOM()").first
  end

  private
    def ensure_session_token
      self.session_token ||= new_session_token
    end

    def new_session_token
      SecureRandom.urlsafe_base64
    end
end
